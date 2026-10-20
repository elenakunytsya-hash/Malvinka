import { Timestamp } from 'firebase-admin/firestore';

export type NetworkType = 'rakuten' | 'awin';

export interface MerchantDocument {
  id: string; // e.g., "olaola_118551"
  name: string; // "OLAOLA"
  network: NetworkType;
  networkMerchantId: number; // 118551
  cookieWindowDays: number; // 30
  baseCommissionRate: number; // 0.10 (10%)
  hasSalePenalty: boolean;
  excludedBrands: string[];
  excludedSkus: string[];
  isActive: boolean;
  updatedAt: Timestamp;
}

export interface PromotionDocument {
  id: string; // Unique slug (e.g., "olaola-organic-cotton-robe-kids")
  title: string;
  brand: string;
  category: 'apparel' | 'footwear' | 'accessories' | 'lifestyle';
  merchantId: string;
  merchantName: string;
  originalProductUrl: string;
  affiliateUrl: string;
  currency: 'USD' | 'CAD';
  originalPrice: number;
  salePrice: number;
  discountPercent: number;
  isSale: boolean;
  projectedCommissionRate: number;
  estimatedCommissionAmount: number;
  isExcluded: boolean;
  imageUrls: string[];
  primaryImageUrl: string;
  pinData: {
    isPinned: boolean;
    pinnedAt?: Timestamp;
  };
  status: 'active' | 'expired' | 'review';
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
