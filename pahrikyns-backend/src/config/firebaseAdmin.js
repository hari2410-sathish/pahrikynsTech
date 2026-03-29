const admin = require("firebase-admin");

if (process.env.FB_PROJECT_ID && process.env.FB_CLIENT_EMAIL && process.env.FB_PRIVATE_KEY) {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FB_PROJECT_ID,
        clientEmail: process.env.FB_CLIENT_EMAIL,
        privateKey: process.env.FB_PRIVATE_KEY.replace(/\\n/g, "\n"),
      }),
    });
    console.log("🔥 Firebase Admin initialized");
  }
  module.exports = admin;
} else {
  console.warn("⚠️ Firebase Admin skipped: Missing FB env configs. Using mock admin.");
  const mockAdmin = {
    firestore: () => ({
      collection: () => ({ doc: () => ({ set: async () => {}, get: async () => ({ exists: false, data: () => ({}) }) }) }),
    }),
    messaging: () => ({
      send: async () => { console.warn("Mock push notification sent."); }
    }),
  };
  module.exports = mockAdmin;
}
