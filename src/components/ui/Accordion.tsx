'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface AccordionItem {
  id: string;
  title: string | React.ReactNode;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  className,
}) => {
  const [expanded, setExpanded] = React.useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (!allowMultiple) next.clear();
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className={cn('w-full', className)}>
      {items.map((item) => {
        const isExpanded = expanded.has(item.id);
        return (
          <div key={item.id} className="accordion-item">
            <button
              onClick={() => toggle(item.id)}
              className="accordion-trigger"
              aria-expanded={isExpanded}
            >
              <span>{item.title}</span>
              <span
                className={cn(
                  'material-symbols-outlined text-mink transition-transform duration-300',
                  isExpanded && 'rotate-180'
                )}
              >
                keyboard_arrow_down
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="accordion-content"
                >
                  <div className="pb-5 font-body-md text-mink/80 text-sm leading-relaxed">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};
