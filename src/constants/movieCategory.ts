export const BASE_URL = 'https://api.themoviedb.org/3/movie';

export const CATEGORY_ENDPOINTS = {
  now_playing: `${BASE_URL}/now_playing`,
  popular: `${BASE_URL}/popular`,
  top_rated: `${BASE_URL}/top_rated`,
  upcoming: `${BASE_URL}/upcoming`,
};

export const API_LANGUAGE = 'ko-KR';
export const API_PAGE = 1;
export const CACHE_PAGE = 3;
export const ONE_DAY_SECONDS = 60 * 60 * 24;
