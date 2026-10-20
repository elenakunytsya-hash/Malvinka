import { MerchantDocument, PromotionDocument } from '../types/deal';

interface RawFeedProduct {
  title: string;
  brand: string;
  sku: string;
  productUrl: string;
  currency: 'USD' | 'CAD';
  originalPrice: number;
  salePrice: number;
  imageUrls: string[];
}

export function processFeedProduct(
  raw: RawFeedProduct,
  merchant: MerchantDocument
): Omit<PromotionDocument, 'createdAt' | 'updatedAt'> {
  const isSale = raw.salePrice < raw.originalPrice;
  const discountPercent = Math.round(
    ((raw.originalPrice - raw.salePrice) / raw.originalPrice) * 100
  );

  // Check exclusions
  const isExcludedBrand = merchant.excludedBrands.includes(raw.brand);
  const isExcludedSku = merchant.excludedSkus.includes(raw.sku);
  const isExcluded = isExcludedBrand || isExcludedSku;

  // Calculate commission rate
  let projectedCommissionRate = merchant.baseCommissionRate;
  if (isExcluded) {
    projectedCommissionRate = 0.0;
  } else if (isSale && merchant.hasSalePenalty) {
    // Apply merchant-specific sale penalty if applicable (e.g., Mytheresa drops to 4%)
    projectedCommissionRate = merchant.baseCommissionRate / 2; 
  }

  const estimatedCommissionAmount = Number(
    (raw.salePrice * projectedCommissionRate).toFixed(2)
  );

  // Generate unique slug ID
  const slugId = `${merchant.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${raw.sku.toLowerCase()}`;

  return {
    id: slugId,
    title: raw.title,
    brand: raw.brand || merchant.name,
    category: 'apparel',
    merchantId: merchant.id,
    merchantName: merchant.name,
    originalProductUrl: raw.productUrl,
    affiliateUrl: generateAffiliateDeepLink(raw.productUrl, merchant),
    currency: raw.currency,
    originalPrice: raw.originalPrice,
    salePrice: raw.salePrice,
    discountPercent,
    isSale,
    projectedCommissionRate,
    estimatedCommissionAmount,
    isExcluded,
    imageUrls: raw.imageUrls,
    primaryImageUrl: raw.imageUrls[0] || '',
    pinData: { isPinned: false },
    status: isExcluded ? 'review' : 'active',
  };
}

function generateAffiliateDeepLink(productUrl: string, merchant: MerchantDocument): string {
  // Example deep-link wrapper matching Awin / Rakuten formatting standards
  if (merchant.network === 'awin') {
    // Awin publisher tracking wrapper format
    const publisherId = process.env.AWIN_PUBLISHER_ID || '123456';
    return `https://www.awin1.com/cread.php?awinmid=${merchant.networkMerchantId}&awinaffid=${publisherId}&clickref=pinterest&p=${encodeURIComponent(productUrl)}`;
  } else {
    // Rakuten deep-link wrapper format
    const siteId = process.env.RAKUTEN_SITE_ID || 'default';
    return `https://click.linksynergy.com/deeplink?id=${siteId}&mid=${merchant.networkMerchantId}&murl=${encodeURIComponent(productUrl)}`;
  }
}
