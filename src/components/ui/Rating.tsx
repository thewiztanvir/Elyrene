'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface RatingProps {
  rating: number;
  count?: number;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onChange?: (rating: number) => void;
  className?: string;
}

const sizeClasses = {
  sm: 'text-[14px]',
  md: 'text-[18px]',
  lg: 'text-[24px]',
};

export const Rating: React.FC<RatingProps> = ({
  rating,
  count,
  size = 'md',
  interactive = false,
  onChange,
  className,
}) => {
  const [hoverRating, setHoverRating] = React.useState<number | null>(null);

  const currentRating = hoverRating !== null ? hoverRating : Math.round(rating * 2) / 2; // round to nearest 0.5

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div 
        className="flex"
        onMouseLeave={() => interactive && setHoverRating(null)}
      >
        {[1, 2, 3, 4, 5].map((star) => {
          const isFilled = currentRating >= star;
          const isHalf = currentRating + 0.5 === star;

          let icon = 'star'; // empty
          let iconClass = 'star-empty';
          if (isFilled) {
            icon = 'star'; // filled
            iconClass = 'star-filled material-symbols-filled';
          } else if (isHalf) {
            icon = 'star_half';
            iconClass = 'star-filled material-symbols-filled';
          }

          return (
            <span
              key={star}
              className={cn(
                'material-symbols-outlined leading-none',
                sizeClasses[size],
                iconClass,
                interactive && 'cursor-pointer hover:scale-110 transition-transform'
              )}
              onMouseEnter={() => interactive && setHoverRating(star)}
              onClick={() => interactive && onChange?.(star)}
            >
              {icon}
            </span>
          );
        })}
      </div>
      {count !== undefined && (
        <span className="font-body-md text-xs text-mink ml-1">({count})</span>
      )}
    </div>
  );
};
