'use server';

import { TMDB_URL } from '@/constants/tmdbConstants';
import { Movie } from '@/types/DetailMovie';
import { MovieVideos, Video } from '@/types/Video';

export const getMovieDetails = async (id: number): Promise<Movie> => {
  const res = await fetch(`${TMDB_URL}/${id}?language=ko`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    },
  });
  const data: Movie = await res.json();

  return data;
};

export const getMovieVideo = async (id: number): Promise<Video | null> => {
  const res = await fetch(`${TMDB_URL}/${id}/videos?language=ko`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    },
  });
  const data: MovieVideos = await res.json();
  console.log(data);
  if (data.results) {
    return data.results[0];
  }

  return null;
};
