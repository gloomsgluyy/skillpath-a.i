import { getUserProfile, saveUserProfile, incrementUserPoints } from '@/lib/firestore';
import { getDoc, setDoc, updateDoc, doc } from 'firebase/firestore';

jest.mock('@/lib/firebase', () => ({
  db: {},
  app: {},
  auth: {},
}));

jest.mock('firebase/firestore', () => {
  const original = jest.requireActual('firebase/firestore');
  return {
    ...original,
    getDoc: jest.fn(),
    setDoc: jest.fn(),
    updateDoc: jest.fn(),
    doc: jest.fn(),
    collection: jest.fn(),
    getDocs: jest.fn(),
    query: jest.fn(),
    where: jest.fn(),
    increment: jest.fn((val) => ({ _type: 'increment', val })),
    serverTimestamp: jest.fn(() => ({ _type: 'serverTimestamp' })),
  };
});

describe('firestore helpers: user profiles', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getUserProfile', () => {
    it('returns null if uid is empty', async () => {
      const result = await getUserProfile('');
      expect(result).toBeNull();
      expect(getDoc).not.toHaveBeenCalled();
    });

    it('returns user data if doc exists', async () => {
      const mockData = { displayName: 'John Doe', level: 5 };
      (getDoc as jest.Mock).mockResolvedValue({
        exists: () => true,
        data: () => mockData,
      });

      const result = await getUserProfile('user123');
      expect(result).toEqual(mockData);
      expect(doc).toHaveBeenCalledWith(expect.anything(), 'users', 'user123');
    });

    it('returns null if doc does not exist', async () => {
      (getDoc as jest.Mock).mockResolvedValue({
        exists: () => false,
      });

      const result = await getUserProfile('user456');
      expect(result).toBeNull();
    });
  });

  describe('saveUserProfile', () => {
    it('creates new user if it does not exist', async () => {
      (getDoc as jest.Mock).mockResolvedValue({ exists: () => false });
      
      await saveUserProfile('user123', { displayName: 'John' });
      
      expect(setDoc).toHaveBeenCalledWith(
        undefined,
        expect.objectContaining({
          uid: 'user123',
          displayName: 'John',
          points: 0,
          level: 1,
        })
      );
    });

    it('updates user if it already exists', async () => {
      (getDoc as jest.Mock).mockResolvedValue({ exists: () => true });
      
      await saveUserProfile('user123', { displayName: 'John Updated' });
      
      expect(updateDoc).toHaveBeenCalledWith(
        undefined,
        expect.objectContaining({
          displayName: 'John Updated',
        })
      );
    });
  });

  describe('incrementUserPoints', () => {
    it('calls updateDoc with increment', async () => {
      await incrementUserPoints('user123', 50);
      expect(updateDoc).toHaveBeenCalledWith(
        undefined,
        expect.objectContaining({
          points: expect.objectContaining({ _type: 'increment', val: 50 })
        })
      );
    });
  });
});
