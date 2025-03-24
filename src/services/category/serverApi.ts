'use server';
import { ApiResponse } from '@/types/category/movie';
import { TMDB_BASE_URL } from '@/constants/tmdbBaseUrl';

export const ONE_DAY_SECONDS = 60 * 60 * 24;
const CACHE_PAGE = 3;

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
  },
};

// NowPlaying
export const getNowPlaying = async (page: number = 1): Promise<ApiResponse> => {
  const TMDB_NOW_PLAYING_API = `${TMDB_BASE_URL}/now_playing?language=ko&page=${page}&region=KR`;
  const res = await fetch(TMDB_NOW_PLAYING_API, {
    ...options,
    cache: page <= CACHE_PAGE ? 'force-cache' : 'no-store', // 1~3: ISR / 4~: SSR
    next: page <= CACHE_PAGE ? { revalidate: ONE_DAY_SECONDS } : undefined, // 1~3: 하루
  });
  const data = await res.json();
  return data;
};

// Popular
export const getPopular = async (page: number = 1): Promise<ApiResponse> => {
  const TMDB_POPULAR_API = `${TMDB_BASE_URL}/popular?language=ko&page=${page}&region=KR`;
  const res = await fetch(TMDB_POPULAR_API, {
    ...options,
    cache: page <= CACHE_PAGE ? 'force-cache' : 'no-store',
    next: page <= CACHE_PAGE ? { revalidate: ONE_DAY_SECONDS } : undefined,
  });
  const data = await res.json();
  return data;
};

// TopRated
export const getTopRated = async (page: number = 1): Promise<ApiResponse> => {
  const TMDB_TOP_RATED_API = `${TMDB_BASE_URL}/top_rated?language=ko&page=${page}&region=KR`;
  const res = await fetch(TMDB_TOP_RATED_API, {
    ...options,
    cache: page <= CACHE_PAGE ? 'force-cache' : 'no-store',
    next: page <= CACHE_PAGE ? { revalidate: ONE_DAY_SECONDS } : undefined,
  });
  const data = await res.json();
  return data;
};

export const getUpcoming = async (page: number = 1): Promise<ApiResponse> => {
  const TMDB_UPCOMING_API = `${TMDB_BASE_URL}/upcoming?language=ko&page=${page}&region=KR`;
  const res = await fetch(TMDB_UPCOMING_API, {
    ...options,
    cache: page <= CACHE_PAGE ? 'force-cache' : 'no-store',
    next: page <= CACHE_PAGE ? { revalidate: ONE_DAY_SECONDS } : undefined,
  });
  const data = await res.json();
  return data;
};
