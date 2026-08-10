const prisma = require("../config/prismaClient");
const Razorpay = require("razorpay");
const crypto = require("crypto");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/*
|--------------------------------------------------------------------------
| CREATE SUBSCRIPTION PAYMENT + RAZORPAY ORDER
|--------------------------------------------------------------------------
*/
exports.createSubscriptionPayment = async (req, res) => {
  try {
    const { planId, price } = req.body;
    const userId = req.user.id;

    if (!planId || !price) {
      return res.status(400).json({ error: "Plan ID and price are required" });
    }

    // 1️⃣ Create payment record (PENDING)
    const payment = await prisma.payment.create({
      data: {
        userId,
        amount: price,
        currency: "INR",
        status: "PENDING",
        planType: planId,
      },
    });

    // 2️⃣ Create Razorpay order
    const order = await razorpay.orders.create({
      amount: price * 100, // paise
      currency: "INR",
      receipt: payment.id,
      payment_capture: 1,
    });

    // 3️⃣ Save Razorpay order id
    await prisma.payment.update({
      where: { id: payment.id },
      data: { razorpayOrderId: order.id },
    });

    // 4️⃣ Notify user
    await prisma.notification.create({
      data: {
        userId,
        title: "Subscription Initiated 💳",
        message: `Payment started for plan: ${planId}`,
        type: "payment",
      },
    });

    // 5️⃣ Send data to frontend
    res.json({
      success: true,
      key: process.env.RAZORPAY_KEY_ID,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      paymentId: payment.id,
      planId,
    });
  } catch (err) {
    console.error("createSubscriptionPayment error:", err);
    res.status(500).json({ error: "Payment creation failed" });
  }
};

/*
|--------------------------------------------------------------------------
| VERIFY SUBSCRIPTION PAYMENT + ACTIVATE SUBSCRIPTION
|--------------------------------------------------------------------------
*/
exports.verifySubscriptionPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ error: "Missing verification data" });
    }

    // 1️⃣ Verify signature
    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ error: "Invalid payment signature" });
    }

    // 2️⃣ Update payment as SUCCESS
    const paymentRecord = await prisma.payment.findUnique({
      where: { razorpayOrderId: razorpay_order_id },
      include: { user: true },
    });

    if (!paymentRecord) {
      return res.status(404).json({ error: "Payment record not found" });
    }

    let paymentMethod = "Razorpay";
    try {
      const rzpPayment = await razorpay.payments.fetch(razorpay_payment_id);
      paymentMethod = rzpPayment.method; // card, upi, netbanking, etc.
    } catch (rzpErr) {
      console.error("Failed to fetch Razorpay details", rzpErr);
    }

    const updatedPayment = await prisma.payment.update({
      where: { id: paymentRecord.id },
      data: {
        status: "SUCCESS",
        method: paymentMethod,
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
      },
    });

    // 3️⃣ 🔓 ACTIVATE SUBSCRIPTION
    const isYearly = updatedPayment.planType.includes("yearly");
    const expirationDate = new Date();
    if (isYearly) {
      expirationDate.setFullYear(expirationDate.getFullYear() + 1);
    } else {
      expirationDate.setMonth(expirationDate.getMonth() + 1);
    }

    await prisma.subscription.upsert({
      where: {
        userId: updatedPayment.userId,
      },
      update: {
        status: "ACTIVE",
        plan: updatedPayment.planType,
        lastPaymentId: updatedPayment.id,
        expiresAt: expirationDate,
      },
      create: {
        userId: updatedPayment.userId,
        status: "ACTIVE",
        plan: updatedPayment.planType,
        lastPaymentId: updatedPayment.id,
        expiresAt: expirationDate,
      },
    });

    // 4️⃣ Notify user
    await prisma.notification.create({
      data: {
        userId: updatedPayment.userId,
        title: "Subscription Active 🚀",
        message: "Your subscription has been successfully activated!",
        type: "payment",
      },
    });

    res.json({
      success: true,
      message: "Payment verified & subscription activated",
      payment: updatedPayment,
    });
  } catch (err) {
    console.error("verifySubscriptionPayment error:", err);
    res.status(500).json({ error: "Subscription verification failed" });
  }
};
