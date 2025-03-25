'use server';

import { Movie, PaginatedResponse } from '@/types/Movie';

export const fetchSearchMovies = async (input: string) => {
  const res = await fetch(`http://localhost:3000/api/search?title=${input}`);
  const data: PaginatedResponse<Movie> = await res.json();
  return data.results;
};
