'use server';
import { ApiResponse } from '@/types/category/movie';
import { TMDB_BASE_URL } from '@/constants/tmdbBaseUrl';

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
  const res = await fetch(TMDB_NOW_PLAYING_API, options);
  const data = await res.json();
  return data;
};

// Popular
export const getPopular = async (page: number = 1): Promise<ApiResponse> => {
  const TMDB_POPULAR_API = `${TMDB_BASE_URL}/popular?language=ko&page=${page}&region=KR`;
  const res = await fetch(TMDB_POPULAR_API, options);
  const data = await res.json();
  return data;
};

// TopRated
export const getTopRated = async (page: number = 1): Promise<ApiResponse> => {
  const TMDB_TOP_RATED_API = `${TMDB_BASE_URL}/top_rated?language=ko&page=${page}&region=KR`;
  const res = await fetch(TMDB_TOP_RATED_API, options);
  const data = await res.json();
  return data;
};

export const getUpcoming = async (page: number = 1): Promise<ApiResponse> => {
  const TMDB_UPCOMING_API = `${TMDB_BASE_URL}/upcoming?language=ko&page=${page}&region=KR`;
  const res = await fetch(TMDB_UPCOMING_API, options);
  const data = await res.json();
  return data;
};
