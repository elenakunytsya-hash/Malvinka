import React from 'react';
import { DealCard } from './DealCard';
import { PromotionDocument } from '../types/deal';

interface DealGridProps {
  promotions: PromotionDocument[];
}

export const DealGrid: React.FC<DealGridProps> = ({ promotions }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {promotions.map((promo) => (
          <DealCard key={promo.id} promotion={promo} />
        ))}
      </div>
    </div>
  );
};
