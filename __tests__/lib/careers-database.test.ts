import { getCategories, searchCareers, computeMatchScore, CAREERS } from '@/lib/careers-database';

describe('careers-database', () => {
  describe('getCategories', () => {
    it('returns an array of categories starting with Semua', () => {
      const categories = getCategories();
      expect(Array.isArray(categories)).toBe(true);
      expect(categories[0]).toBe('Semua');
    });
  });

  describe('searchCareers', () => {
    it('returns all careers when query and category are empty/Semua', () => {
      const results = searchCareers('', 'Semua');
      expect(results.length).toBe(CAREERS.length);
    });

    it('filters by category', () => {
      const results = searchCareers('', 'Data & AI');
      expect(results.length).toBeGreaterThan(0);
      expect(results.every(c => c.category === 'Data & AI')).toBe(true);
    });

    it('filters by query string (case insensitive) matching title or desc', () => {
      const results = searchCareers('developer');
      expect(results.length).toBeGreaterThan(0);
      expect(results.every(c => 
        c.title.toLowerCase().includes('developer') || 
        c.skills.some(s => s.toLowerCase().includes('developer')) ||
        c.desc.toLowerCase().includes('developer')
      )).toBe(true);
    });
  });

  describe('computeMatchScore', () => {
    const mockCareer = CAREERS.find(c => c.id === 'frontend-engineer')!;

    it('returns 0 if userProfile is null', () => {
      const score = computeMatchScore(mockCareer, null);
      expect(score).toBe(0);
    });

    it('boosts score significantly for matching role interest', () => {
      const score = computeMatchScore(mockCareer, { roleInterests: ['Frontend Developer'] });
      expect(score).toBeGreaterThanOrEqual(75);
    });

    it('adds score for matching archetype', () => {
      const boostedScore = computeMatchScore(mockCareer, { roleInterests: [], archetype: 'kreatif' });
      expect(boostedScore).toBe(25);
    });

    it('caps the score at 99', () => {
      const score = computeMatchScore(mockCareer, { 
        roleInterests: ['Frontend Developer'], 
        archetype: 'kreatif',
        jurusan: 'teknik informatika'
      });
      expect(score).toBeLessThanOrEqual(99);
    });
  });
});
