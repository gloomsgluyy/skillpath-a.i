export interface OnboardingProfile {
  pendidikan?: string;
  archetype?: string;
  roleInterests?: string[];
  jurusan?: string;
  minat?: string;
  displayName?: string;
  targetCareer?: string;
}

export interface CareerRecommendation {
  careerTitle: string;
  matchScore: number;
  reason: string;
  skills: string[];
}

interface PendingRecommendations {
  recommendations: CareerRecommendation[];
  selected: CareerRecommendation;
  profile: OnboardingProfile;
  generatedAt: number;
}

export const ONBOARDING_DATA_KEY = 'skillpath_onboarding_data';
export const PENDING_RECOMMENDATIONS_KEY = 'skillpath_pending_recommendations';

const PENDING_TTL = 1000 * 60 * 30;

function isBrowser() {
  return typeof window !== 'undefined';
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function toRecommendation(value: unknown): CareerRecommendation | null {
  if (!isObject(value)) return null;
  const careerTitle = typeof value.careerTitle === 'string' ? value.careerTitle.trim() : '';
  const reason = typeof value.reason === 'string' ? value.reason.trim() : '';
  const matchScore = typeof value.matchScore === 'number' ? value.matchScore : Number(value.matchScore);
  const skills = Array.isArray(value.skills)
    ? value.skills.filter((skill): skill is string => typeof skill === 'string' && skill.trim().length > 0).slice(0, 5)
    : [];

  if (!careerTitle || !Number.isFinite(matchScore)) return null;

  return {
    careerTitle,
    matchScore: Math.min(99, Math.max(1, Math.round(matchScore))),
    reason: reason || 'Rekomendasi ini paling dekat dengan profil dan minat yang kamu isi.',
    skills,
  };
}

export function normalizeRecommendations(payload: unknown): CareerRecommendation[] {
  const source = isObject(payload) && Array.isArray(payload.recommendations)
    ? payload.recommendations
    : Array.isArray(payload)
      ? payload
      : isObject(payload)
        ? [payload]
        : [];

  return source.map(toRecommendation).filter((item): item is CareerRecommendation => Boolean(item)).slice(0, 3);
}

export async function fetchCareerRecommendations(profile: OnboardingProfile): Promise<CareerRecommendation[]> {
  const res = await fetch('/api/recommend', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(profile),
  });

  const payload = await res.json().catch(() => null);

  if (!res.ok) {
    const message = isObject(payload) && typeof payload.error === 'string'
      ? payload.error
      : 'Gagal memproses rekomendasi AI.';
    throw new Error(message);
  }

  const recommendations = normalizeRecommendations(payload);
  if (recommendations.length === 0) {
    throw new Error('AI belum mengembalikan rekomendasi karir yang valid.');
  }

  return recommendations;
}

export function buildOnboardingProfile(data: OnboardingProfile): OnboardingProfile {
  return {
    pendidikan: data.pendidikan || '',
    archetype: data.archetype || '',
    roleInterests: data.roleInterests || [],
    jurusan: data.jurusan || '',
    minat: data.minat || '',
    displayName: data.displayName || '',
    targetCareer: data.targetCareer || '',
  };
}

export function saveOnboardingProfile(profile: OnboardingProfile) {
  if (!isBrowser()) return;
  localStorage.setItem(ONBOARDING_DATA_KEY, JSON.stringify(profile));
}

export function readOnboardingProfile(): OnboardingProfile | null {
  if (!isBrowser()) return null;
  try {
    const raw = localStorage.getItem(ONBOARDING_DATA_KEY);
    return raw ? JSON.parse(raw) as OnboardingProfile : null;
  } catch {
    return null;
  }
}

export function savePendingRecommendations(recommendations: CareerRecommendation[], profile: OnboardingProfile) {
  if (!isBrowser() || recommendations.length === 0) return;
  const selected = recommendations[0];
  const payload: PendingRecommendations = {
    recommendations,
    selected,
    profile: { ...profile, targetCareer: selected.careerTitle },
    generatedAt: Date.now(),
  };
  localStorage.setItem(PENDING_RECOMMENDATIONS_KEY, JSON.stringify(payload));
}

export function readPendingRecommendations({ consume = false } = {}): PendingRecommendations | null {
  if (!isBrowser()) return null;
  try {
    const raw = localStorage.getItem(PENDING_RECOMMENDATIONS_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as PendingRecommendations;
    const recommendations = normalizeRecommendations(parsed.recommendations);
    const selected = toRecommendation(parsed.selected) || recommendations[0];
    const isFresh = typeof parsed.generatedAt === 'number' && Date.now() - parsed.generatedAt < PENDING_TTL;

    if (!isFresh || recommendations.length === 0 || !selected) {
      localStorage.removeItem(PENDING_RECOMMENDATIONS_KEY);
      return null;
    }

    if (consume) localStorage.removeItem(PENDING_RECOMMENDATIONS_KEY);

    return {
      recommendations,
      selected,
      profile: parsed.profile || {},
      generatedAt: parsed.generatedAt,
    };
  } catch {
    localStorage.removeItem(PENDING_RECOMMENDATIONS_KEY);
    return null;
  }
}

export function setLocalCareer(uid: string, careerTitle: string) {
  if (!isBrowser() || !uid || !careerTitle) return;
  localStorage.setItem(`skillpath_career_${uid}`, careerTitle);
}

export function getLocalCareer(uid: string) {
  if (!isBrowser() || !uid) return '';
  return localStorage.getItem(`skillpath_career_${uid}`) || '';
}

export function getProfileFallbackCareer(profile: OnboardingProfile | null | undefined) {
  const text = [
    ...(profile?.roleInterests || []),
    profile?.targetCareer || '',
    profile?.minat || '',
    profile?.jurusan || '',
    profile?.archetype || '',
  ].join(' ').toLowerCase();

  const rules: Array<[RegExp, string]> = [
    [/ai|ml|machine|data scientist|artificial|kecerdasan/, 'AI/ML Engineer'],
    [/data analyst|analyst|analytics|tableau|excel|sql/, 'Data Analyst'],
    [/data engineer|etl|pipeline|spark/, 'Data Engineer'],
    [/ui|ux|figma|design|desain|kreatif/, 'UI/UX Product Designer'],
    [/front|react|web|typescript|tailwind/, 'Frontend Web Engineer'],
    [/back|api|server|node|go|microservice/, 'Backend Developer'],
    [/mobile|android|ios|flutter|react native/, 'Mobile App Developer'],
    [/devops|cloud|aws|gcp|docker|kubernetes/, 'DevOps Engineer'],
    [/cyber|security|keamanan|pentest|hacking/, 'Cyber Security Analyst'],
    [/game|unity|unreal/, 'Game Developer'],
    [/product|manager|pm|bisnis/, 'Product Manager'],
    [/marketing|seo|ads|content|konten/, 'Digital Marketing Specialist'],
    [/video|editor|film/, 'Video Editor'],
    [/blockchain|web3|solidity/, 'Blockchain Developer'],
  ];

  return rules.find(([pattern]) => pattern.test(text))?.[1] || '';
}

export function getBestKnownCareer(uid?: string) {
  const localCareer = uid ? getLocalCareer(uid) : '';
  if (localCareer) return localCareer;

  const pending = readPendingRecommendations();
  if (pending?.selected?.careerTitle) return pending.selected.careerTitle;

  return getProfileFallbackCareer(readOnboardingProfile());
}
