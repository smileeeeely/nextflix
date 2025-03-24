'use server';

import { TMDB_URL } from '@/constants/tmdbConstants';
import { Movie } from '@/types/DetailMovie';

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
