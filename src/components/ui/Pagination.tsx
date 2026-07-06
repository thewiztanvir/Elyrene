'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
}) => {
  const getPages = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <nav className={cn('flex items-center justify-center space-x-2', className)} aria-label="Pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-10 h-10 flex items-center justify-center text-mink hover:text-noir disabled:opacity-30 disabled:hover:text-mink transition-colors"
        aria-label="Previous Page"
      >
        <span className="material-symbols-outlined">chevron_left</span>
      </button>

      {getPages().map((page, idx) => (
        <React.Fragment key={idx}>
          {typeof page === 'number' ? (
            <button
              onClick={() => onPageChange(page)}
              className={cn(
                'w-10 h-10 flex items-center justify-center font-body-md text-sm transition-all duration-300 rounded-sm',
                currentPage === page
                  ? 'bg-noir text-ivory'
                  : 'text-mink hover:text-noir hover:bg-surface-container'
              )}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {page}
            </button>
          ) : (
            <span className="w-10 h-10 flex items-center justify-center text-mink">
              {page}
            </span>
          )}
        </React.Fragment>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-10 h-10 flex items-center justify-center text-mink hover:text-noir disabled:opacity-30 disabled:hover:text-mink transition-colors"
        aria-label="Next Page"
      >
        <span className="material-symbols-outlined">chevron_right</span>
      </button>
    </nav>
  );
};
