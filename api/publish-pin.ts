import type { VercelRequest, VercelResponse } from '@vercel/node';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, limit } from 'firebase/firestore';

// 1. Initialize Firebase securely
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 2. Security Check: Only allow Vercel Cron to trigger this endpoint
  const authHeader = req.headers['authorization'];
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // 3. Fetch a single promotion from Firestore
    const promosRef = collection(db, "promotions");
    const q = query(promosRef, limit(1)); // Grabs 1 document for the daily pin
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return res.status(404).json({ success: false, error: "No promotions found to pin." });
    }

    const doc = querySnapshot.docs[0];
    const promo = { id: doc.id, ...doc.data() } as any;

    // 4. Format the Pinterest API v5 payload
    const pinPayload = {
      board_id: process.env.PINTEREST_BOARD_ID,
      title: promo.title || "Malvinka Boutique Find",
      description: promo.description || "Curated European boutique pieces. Available via Malvinka.",
      link: `https://www.malvinka.ca/promos/${promo.id}`,
      media_source: {
        source_type: "image_url",
        url: promo.imageUrl // Make sure your Firestore documents have an 'imageUrl' field
      }
    };

    // 5. Send to Pinterest
    const response = await fetch("https://api.pinterest.com/v5/pins", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.PINTEREST_ACCESS_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(pinPayload)
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Pinterest API error:", data);
      return res.status(response.status).json({ success: false, error: data });
    }

    return res.status(200).json({ success: true, pin: data });
  } catch (error: any) {
    console.error("Internal Server Error:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
