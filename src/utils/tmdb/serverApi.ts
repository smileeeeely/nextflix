'use server';
import { TMDB_NOW_PLAYING_API, TMDB_POPULAR_API, TMDB_TOP_RATED_API, TMDB_UPCOMING_API } from './tmdbURL';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
  },
};

// NowPlaying
export const getNowPlaying = async () => {
  const res = await fetch(TMDB_NOW_PLAYING_API, options);
  const data = await res.json();
  return data;
};

// Popular
export const getPopular = async () => {
  const res = await fetch(TMDB_POPULAR_API, options);
  const data = await res.json();
  return data;
};

// TopRated
export const getTopRated = async () => {
  const res = await fetch(TMDB_TOP_RATED_API, options);
  const data = await res.json();
  return data;
};

export const getUpcoming = async () => {
  const res = await fetch(TMDB_UPCOMING_API, options);
  const data = await res.json();
  return data;
};
