const fs = require("fs");
const path = require("path");
const cron = require("node-cron");

/**
 * CLEANS UP OLD INVOICES
 * Deletes PDF files older than 7 days to save disk space.
 */
function cleanInvoices() {
    console.log("🧹 [JOB] Starting invoice cleanup...");

    // Target directories
    const targets = [
        path.join(process.cwd(), "tmp/invoices"),
        path.join(process.cwd(), "src/uploads/invoices"),
        path.join(process.cwd(), "uploads/invoices")
    ];

    const DAYS_TO_KEEP = 7;
    const now = Date.now();
    const msToKeep = DAYS_TO_KEEP * 24 * 60 * 60 * 1000;

    targets.forEach(dir => {
        if (!fs.existsSync(dir)) return;

        fs.readdir(dir, (err, files) => {
            if (err) {
                console.error(`❌ Error reading ${dir}:`, err);
                return;
            }

            files.forEach(file => {
                if (!file.endsWith(".pdf")) return;

                const filePath = path.join(dir, file);
                fs.stat(filePath, (err, stats) => {
                    if (err) return;

                    const age = now - stats.mtimeMs;
                    if (age > msToKeep) {
                        fs.unlink(filePath, (err) => {
                            if (err) console.error(`❌ Failed to delete ${file}:`, err);
                            else console.log(`🗑️ Deleted old invoice: ${file}`);
                        });
                    }
                });
            });
        });
    });
}

// Run every midnight (00:00)
function startInvoiceCleanupJob() {
    cron.schedule("0 0 * * *", () => {
        cleanInvoices();
    });

    // Run once on startup if needed
    // cleanInvoices();
    console.log("⏰ [JOB] Invoice cleanup job scheduled (Daily at Midnight)");
}

module.exports = startInvoiceCleanupJob;
