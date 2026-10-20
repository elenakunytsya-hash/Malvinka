export type NetworkType = 'rakuten' | 'awin';

export interface MerchantDocument {
  id: string;
  name: string;
  network: NetworkType;
  networkMerchantId: number;
  cookieWindowDays: number;
  baseCommissionRate: number;
  hasSalePenalty: boolean;
  excludedBrands: string[];
  excludedSkus: string[];
  isActive: boolean;
  updatedAt: string | Date; // Universal type for both client and server
}

export interface PromotionDocument {
  id: string;
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
    pinnedAt?: string | Date;
  };
  status: 'active' | 'expired' | 'review';
  createdAt: string | Date;
  updatedAt: string | Date;
}
