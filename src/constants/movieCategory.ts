import { TMDB_BASE_URL } from '@/constants/tmdbBaseUrl';

export const API_LANGUAGE = 'ko-KR';
export const API_PAGE = 1;
export const CACHE_PAGE = 3;
export const ONE_DAY_SECONDS = 60 * 60 * 24;

export enum CATEGORY {
  NOW_PLAYING = 'now_playing',
  POPULAR = 'popular',
  TOP_RATED = 'top_rated',
  UPCOMING = 'upcoming',
}

export const CATEGORY_ENDPOINTS: Record<CATEGORY, string> = {
  [CATEGORY.NOW_PLAYING]: `${TMDB_BASE_URL}/${CATEGORY.NOW_PLAYING}`,
  [CATEGORY.POPULAR]: `${TMDB_BASE_URL}/${CATEGORY.POPULAR}`,
  [CATEGORY.TOP_RATED]: `${TMDB_BASE_URL}/${CATEGORY.TOP_RATED}`,
  [CATEGORY.UPCOMING]: `${TMDB_BASE_URL}/${CATEGORY.UPCOMING}`,
};
