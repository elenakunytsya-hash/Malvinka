import React from 'react';
import { PromotionDocument } from '../types/deal';

interface DealCardProps {
  promotion: PromotionDocument;
}

export const DealCard: React.FC<DealCardProps> = ({ promotion }) => {
  const {
    title,
    brand,
    merchantName,
    affiliateUrl,
    currency,
    originalPrice,
    salePrice,
    discountPercent,
    isSale,
    primaryImageUrl,
  } = promotion;

  return (
    <div className="group relative bg-white border border-neutral-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">
      {/* Image & Badges Container */}
      <div className="relative aspect-[4/5] bg-neutral-50 overflow-hidden">
        <img
          src={primaryImageUrl || '/placeholder.jpg'}
          alt={title}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
          <span className="px-2.5 py-1 text-[10px] tracking-wider uppercase font-medium bg-white/90 backdrop-blur-md text-neutral-900 rounded-full shadow-xs">
            {merchantName}
          </span>
          {isSale && discountPercent > 0 && (
            <span className="px-2.5 py-1 text-[10px] tracking-wider uppercase font-bold bg-rose-600 text-white rounded-full shadow-xs">
              -{discountPercent}%
            </span>
          )}
        </div>
      </div>

      {/* Content Container */}
      <div className="p-4 flex flex-col flex-grow justify-between">
        <div>
          <p className="text-xs font-medium tracking-wide text-neutral-400 uppercase mb-1">
            {brand}
          </p>
          <h3 className="text-sm font-normal text-neutral-900 line-clamp-2 mb-3 leading-snug">
            {title}
          </h3>
        </div>

        {/* Price & Action Row */}
        <div className="pt-3 border-t border-neutral-100 flex items-center justify-between mt-auto">
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-semibold text-neutral-900">
              {currency === 'CAD' ? 'CA$' : '$'}
              {salePrice.toFixed(2)}
            </span>
            {isSale && originalPrice > salePrice && (
              <span className="text-xs text-neutral-400 line-through">
                {currency === 'CAD' ? 'CA$' : '$'}
                {originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <a
            href={affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-4 py-2 text-xs font-medium text-white bg-neutral-900 rounded-lg hover:bg-neutral-800 transition-colors shadow-xs"
          >
            View Deal
          </a>
        </div>
      </div>
    </div>
  );
};
