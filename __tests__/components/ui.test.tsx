import { render, screen } from '@testing-library/react';
import { Badge } from '@/components/ui/badge';

describe('UI Components', () => {
  describe('Badge Component', () => {
    it('renders generic badge default variant', () => {
      render(<Badge data-testid="badge">Status</Badge>);
      const badge = screen.getByTestId('badge');
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveTextContent('Status');
    });
  });
});
