import { TMDB_BASE_URL } from '@/constants/tmdbBaseUrl';

export const CATEGORY_ENDPOINTS = {
  now_playing: `${TMDB_BASE_URL}/now_playing`,
  popular: `${TMDB_BASE_URL}/popular`,
  top_rated: `${TMDB_BASE_URL}/top_rated`,
  upcoming: `${TMDB_BASE_URL}/upcoming`,
};

export const API_LANGUAGE = 'ko-KR';
export const API_PAGE = 1;
export const CACHE_PAGE = 3;
export const ONE_DAY_SECONDS = 60 * 60 * 24;
