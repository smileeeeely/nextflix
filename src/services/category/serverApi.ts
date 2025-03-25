'use server';
import { ApiResponse } from '@/types/category/movie';
import { API_LANGUAGE, API_PAGE, CACHE_PAGE, CATEGORY_ENDPOINTS, ONE_DAY_SECONDS } from '@/constants/movieCategory';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
  },
};

// NowPlaying
export const getNowPlaying = async (page: number = API_PAGE): Promise<ApiResponse> => {
  const TMDB_NOW_PLAYING_API = `${CATEGORY_ENDPOINTS.now_playing}?language=${API_LANGUAGE}&page=${page}`;
  const res = await fetch(TMDB_NOW_PLAYING_API, {
    ...options,
    cache: page <= CACHE_PAGE ? 'force-cache' : 'no-store', // 1~3: ISR / 4~: SSR
    next: page <= CACHE_PAGE ? { revalidate: ONE_DAY_SECONDS } : undefined, // 1~3: 하루
  });
  const data = await res.json();
  return data;
};

// Popular
export const getPopular = async (page: number = API_PAGE): Promise<ApiResponse> => {
  const TMDB_POPULAR_API = `${CATEGORY_ENDPOINTS.popular}?language=${API_LANGUAGE}&page=${page}`;
  const res = await fetch(TMDB_POPULAR_API, {
    ...options,
    cache: page <= CACHE_PAGE ? 'force-cache' : 'no-store',
    next: page <= CACHE_PAGE ? { revalidate: ONE_DAY_SECONDS } : undefined,
  });
  const data = await res.json();
  return data;
};

// TopRated
export const getTopRated = async (page: number = API_PAGE): Promise<ApiResponse> => {
  const TMDB_TOP_RATED_API = `${CATEGORY_ENDPOINTS.top_rated}?language=${API_LANGUAGE}&page=${page}`;
  const res = await fetch(TMDB_TOP_RATED_API, {
    ...options,
    cache: page <= CACHE_PAGE ? 'force-cache' : 'no-store',
    next: page <= CACHE_PAGE ? { revalidate: ONE_DAY_SECONDS } : undefined,
  });
  const data = await res.json();
  return data;
};

export const getUpcoming = async (page: number = API_PAGE): Promise<ApiResponse> => {
  const TMDB_UPCOMING_API = `${CATEGORY_ENDPOINTS.upcoming}?language=${API_LANGUAGE}&page=${page}`;
  const res = await fetch(TMDB_UPCOMING_API, {
    ...options,
    cache: page <= CACHE_PAGE ? 'force-cache' : 'no-store',
    next: page <= CACHE_PAGE ? { revalidate: ONE_DAY_SECONDS } : undefined,
  });
  const data = await res.json();
  return data;
};
