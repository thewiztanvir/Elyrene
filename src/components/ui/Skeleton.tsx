import * as React from 'react';
import { cn } from '@/lib/utils';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export const SkeletonBox: React.FC<SkeletonProps> = ({ className, ...props }) => {
  return <div className={cn('skeleton', className)} {...props} />;
};

export const SkeletonText: React.FC<SkeletonProps & { lines?: number }> = ({
  className,
  lines = 1,
  ...props
}) => {
  return (
    <div className={cn('space-y-2', className)} {...props}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={cn(
            'skeleton h-4',
            i === lines - 1 && lines > 1 ? 'w-2/3' : 'w-full'
          )}
        />
      ))}
    </div>
  );
};

export const SkeletonProductCard: React.FC<SkeletonProps> = ({ className, ...props }) => {
  return (
    <div className={cn('flex flex-col gap-4', className)} {...props}>
      <SkeletonBox className="aspect-[3/4] w-full" />
      <div className="space-y-2">
        <SkeletonBox className="h-5 w-3/4" />
        <SkeletonBox className="h-4 w-1/4" />
      </div>
    </div>
  );
};

export const SkeletonTable: React.FC<SkeletonProps & { rows?: number; cols?: number }> = ({
  className,
  rows = 5,
  cols = 4,
  ...props
}) => {
  return (
    <div className={cn('w-full border border-mink/10 rounded-sm overflow-hidden', className)} {...props}>
      <div className="flex gap-4 p-4 border-b border-mink/10 bg-surface-container-low">
        {Array.from({ length: cols }).map((_, i) => (
          <SkeletonBox key={i} className="h-4 flex-1" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="flex gap-4 p-4 border-b border-mink/5 last:border-0">
          {Array.from({ length: cols }).map((_, c) => (
            <SkeletonBox key={c} className="h-4 flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
};
