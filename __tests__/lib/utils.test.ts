import { cn } from '@/lib/utils';

describe('utils: cn', () => {
  it('merges and overrides tailwind classes correctly', () => {
    expect(cn('bg-red-500', 'text-white')).toBe('bg-red-500 text-white');
    expect(cn('px-4 py-2', 'px-6')).toBe('py-2 px-6');
    expect(cn('text-sm', false, null, undefined, 'font-bold')).toBe('text-sm font-bold');
  });
});
