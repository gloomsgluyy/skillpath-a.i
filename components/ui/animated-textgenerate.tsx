'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedTextGenerateProps {
  text: string;
  className?: string;
  textClassName?: string;
  blurEffect?: boolean;
  speed?: number;
  highlightWords?: string[];
  highlightClassName?: string;
  linkWords?: string[];
  linkHrefs?: string[];
  linkClassNames?: string[];
  justifyClassName?: string;
}

export const AnimatedTextGenerate = ({
  text,
  className,
  textClassName,
  highlightWords = [],
  highlightClassName,
  linkWords = [],
  linkHrefs = [],
  linkClassNames = [],
  justifyClassName = 'justify-center lg:justify-start',
}: AnimatedTextGenerateProps) => {
  const splitWords = useMemo(() => text.split(' '), [text]);

  const generateWords = () => {
    return (
      <div className={cn('flex flex-wrap items-center gap-1', justifyClassName)}>
        {splitWords.map((word, idx) => {
          const isHighlight =
            highlightWords.length > 0 &&
            highlightWords.some((hw) =>
              word.toLowerCase().includes(hw.toLowerCase()),
            );
          const linkIndex = linkWords.findIndex((lw) =>
            word.toLowerCase().includes(lw.toLowerCase()),
          );
          const isLink = linkIndex !== -1;

          const wordElement = (
            <span
              key={`${word}-${idx}`}
              className={cn(
                'dark:text-white text-black',
                isHighlight && highlightClassName,
              )}
            >
              {word}
            </span>
          );

          if (isLink && linkHrefs[linkIndex]) {
            return (
              <Link
                href={linkHrefs[linkIndex]}
                key={`link-${idx}`}
                className={cn(linkClassNames[linkIndex])}
              >
                {wordElement}
              </Link>
            );
          }
          return wordElement;
        })}
      </div>
    );
  };

  return (
    <div className={cn('font-bold', className)}>
      <div className='mt-4'>
        <div
          className={cn(
            'dark:text-white text-black text-2xl leading-snug tracking-wide',
            textClassName,
          )}
        >
          {generateWords()}
        </div>
      </div>
    </div>
  );
};
