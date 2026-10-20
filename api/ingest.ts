import { initializeApp, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { processFeedProduct } from '../utils/dealEngine';
import { MerchantDocument } from '../types/deal';

if (!getApps().length) {
  initializeApp();
}
const db = getFirestore();

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { merchantId, products } = req.body;

    // 1. Fetch merchant rules from Firestore
    const merchantDoc = await db.collection('merchants').doc(merchantId).get();
    if (!merchantDoc.exists) {
      return res.status(404).json({ error: 'Merchant not found in database' });
    }
    const merchant = merchantDoc.data() as MerchantDocument;

    // 2. Batch write setup
    const batch = db.batch();
    let processedCount = 0;

    for (const rawProduct of products) {
      const promotionData = processFeedProduct(rawProduct, merchant);
      const docRef = db.collection('promotions').doc(promotionData.id);

      batch.set(docRef, {
        ...promotionData,
        createdAt: db.FieldValue.serverTimestamp(),
        updatedAt: db.FieldValue.serverTimestamp(),
      }, { merge: true });

      processedCount++;
    }

    await batch.commit();

    return res.status(200).json({
      success: true,
      message: `Successfully processed and upserted ${processedCount} deals for ${merchant.name}.`,
    });
  } catch (error: any) {
    console.error('Ingestion error:', error);
    return res.status(500).json({ error: error.message });
  }
}
