// src/controllers/toolPaymentController.js
const prisma = require("../config/prismaClient");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const { getBasePrice, calculateFinalPrice, calculateExpirationDate } = require("../config/pricing");
const generateInvoiceNumber = require("../helpers/generateInvoiceNumber");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.createToolPayment = async (req, res) => {
  try {
    const { category, tool, planType } = req.body;
    const userId = req.user.id;

    if (!category || !tool || !planType) {
      return res.status(400).json({ error: "Category, tool, and planType required" });
    }

    // 1️⃣ Calculate Price
    const basePrice = getBasePrice(category, tool);
    const amount = calculateFinalPrice(basePrice, planType);

    // 2️⃣ Create Payment Record (PENDING)
    const payment = await prisma.payment.create({
      data: {
        userId,
        amount,
        currency: "INR",
        status: "PENDING",
        toolCategory: category,
        toolName: tool,
        planType: planType
      },
    });

    // 3️⃣ Create Razorpay Order or Mock for QA
    let order;
    if (!process.env.RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID === "dummy_key_id") {
      order = {
        id: "order_dummy_" + crypto.randomBytes(6).toString("hex"),
        amount: Math.round(amount * 100),
        currency: "INR",
      };
      console.log("⚠️ USING MOCK RAZORPAY ORDER FOR QA TESTING");
    } else {
      order = await razorpay.orders.create({
        amount: Math.round(amount * 100),
        currency: "INR",
        receipt: payment.id,
        payment_capture: 1,
      });
    }

    // 4️⃣ Update Payment
    await prisma.payment.update({
      where: { id: payment.id },
      data: { razorpayOrderId: order.id },
    });

    // 5️⃣ Create Optional Invoice Order (For Admin Dashboard)
    try {
      const { generateInvoiceNumber } = require("../helpers/generateInvoiceNumber");
      const invoiceNumber = await generateInvoiceNumber();
      const user = await prisma.user.findUnique({ where: { id: userId } });
      const newOrder = await prisma.order.create({
        data: {
          customerType: "Student",
          customer: user?.name || "Unknown",
          customerEmail: user?.email,
          fulfillment: "Digital",
          address: "Online",
          paymentMethod: "Razorpay",
          status: "CREATED",
          paymentStatus: "PENDING",
          totalAmount: amount,
          gstAmount: 0,
          grandTotal: amount,
          invoiceNumber,
          items: {
            create: {
              product: `Tool Access: ${tool} (${planType})`,
              quantity: 1,
              price: amount,
            }
          }
        }
      });
      await prisma.payment.update({
        where: { id: payment.id },
        data: { orderId: newOrder.id }
      });
    } catch (ordErr) {
      console.error("Auto-Order Creation Failed", ordErr);
    }

    res.json({
      success: true,
      key: process.env.RAZORPAY_KEY_ID,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      paymentId: payment.id,
      toolTitle: tool,
      category,
      planType
    });
  } catch (err) {
    console.error("createToolPayment error:", err);
    res.status(500).json({ error: "Tool payment creation failed" });
  }
};

exports.verifyToolPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ error: "Missing verification data" });
    }

    // 1️⃣ Verify signature (Bypass for QA Dummy Orders)
    if (!razorpay_order_id.startsWith("order_dummy_")) {
      const sign = razorpay_order_id + "|" + razorpay_payment_id;
      const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(sign)
        .digest("hex");

      if (expectedSignature !== razorpay_signature) {
        return res.status(400).json({ error: "Invalid payment signature" });
      }
    } else {
      console.log("⚠️ QA MOCK SIGNATURE BYPASSED");
    }

    const payment = await prisma.payment.findFirst({
      where: { razorpayOrderId: razorpay_order_id }
    });

    if (!payment) return res.status(404).json({ error: "Payment record not found" });

    // 2️⃣ Update payment as SUCCESS
    const paymentRecord = await prisma.payment.findUnique({
      where: { id: payment.id },
      include: { user: true },
    });

    // 🕵️ Fetch payment details from Razorpay (to get method)
    let paymentMethod = "Razorpay";
    if (!razorpay_order_id.startsWith("order_dummy_")) {
      try {
        const rzpPayment = await razorpay.payments.fetch(razorpay_payment_id);
        paymentMethod = rzpPayment.method; // card, upi, netbanking, etc.
      } catch (rzpErr) {
        console.error("Failed to fetch Razorpay details", rzpErr);
      }
    }

    const updatedPayment = await prisma.payment.update({
      where: { id: payment.id },
      data: {
        status: "SUCCESS",
        method: paymentMethod,
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
      },
    });

    // 3️⃣ 🔓 GRANT TOOL SUBSCRIPTION
    const expiryDate = calculateExpirationDate(updatedPayment.planType);
    
    await prisma.toolSubscription.upsert({
      where: {
        userId_category_tool: {
          userId: updatedPayment.userId,
          category: updatedPayment.toolCategory,
          tool: updatedPayment.toolName
        }
      },
      update: {
        planType: updatedPayment.planType,
        validUntil: expiryDate
      },
      create: {
        userId: updatedPayment.userId,
        category: updatedPayment.toolCategory,
        tool: updatedPayment.toolName,
        planType: updatedPayment.planType,
        validUntil: expiryDate
      }
    });

    // 4️⃣ Notify user
    await prisma.notification.create({
      data: {
        userId: updatedPayment.userId,
        title: "Tool Unlocked ✅",
        message: `You successfully unlocked ${updatedPayment.toolName}! Happy learning! 🚀`,
        type: "payment",
      },
    });

    // 5️⃣ ✅ UPDATE LINKED ORDER STATUS & SEND INVOICE
    if (updatedPayment.orderId) {
      const order = await prisma.order.update({
        where: { id: updatedPayment.orderId },
        data: {
          status: "COMPLETED",
          paymentStatus: "PAID",
          paymentMethod: paymentMethod.toUpperCase(),
        },
        include: { items: true },
      });

      // 📧 GENERATE & SEND INVOICE
      try {
        const { generateInvoicePDF } = require("../utils/generateInvoicePDF");
        const { sendMail } = require("../config/email");
        const path = require("path");

        const invoiceDir = path.join(__dirname, "../../tmp/invoices");
        const fileName = `Invoice_${order.invoiceNumber}.pdf`;
        const filePath = path.join(invoiceDir, fileName);

        await generateInvoicePDF(order, filePath);

        const subject = `Your Invoice #${order.invoiceNumber} - PAHRIKYNS`;
        const text = `Thank you for your purchase, ${order.customer}! Please find your invoice attached.`;
        const html = `
          <div style="font-family: Arial; padding: 20px;">
            <h2>Invoice from PAHRIKYNS</h2>
            <p>Thank you for your purchase! Your payment for <b>${updatedPayment.toolName}</b> was successful.</p>
            <p>Tool access has been unlocked.</p>
            <br/>
            <p>Best regards,<br/>Pahrikyns Team</p>
          </div>
        `;

        await sendMail(order.customerEmail, subject, text, html, [
          {
            filename: fileName,
            path: filePath,
          },
        ]);

      } catch (invErr) {
        console.error("Auto-Invoice Send Failed", invErr);
      }
    }

    res.json({
      success: true,
      message: "Tool unlocked successfully!",
      orderId: updatedPayment.orderId,
    });
  } catch (err) {
    console.error("verifyToolPayment error:", err);
    res.status(500).json({ error: "Payment verification failed" });
  }
};
