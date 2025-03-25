'use server';

import { Movie, PaginatedResponse } from '@/types/Movie';

export const fetchSearchMovies = async (input: string) => {
  const URL = `http://localhost:3000/api/search?title=${input}`;
  const res = await fetch(URL);
  const data: PaginatedResponse<Movie> = await res.json();
  return data.results;
};
