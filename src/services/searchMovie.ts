import { Movie, PaginatedResponse } from '@/types/Movie';
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';

export const fetchSearchMovies = async ({ input, page = 1 }: { input: string; page: number }) => {
  const URL = `http://localhost:3000/api/search?title=${input}&page=${page}`;
  const res = await fetch(URL);
  const data: PaginatedResponse<Movie> = await res.json();
  return data;
};

export const useSearchMovies = ({ searchInput = '' }: { searchInput?: string }) => {
  return useInfiniteQuery<PaginatedResponse<Movie>, Error, InfiniteData<PaginatedResponse<Movie>>, string[], number>({
    queryKey: ['useSearchMovies'],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => fetchSearchMovies({ input: searchInput, page: pageParam }),
    getNextPageParam: (lastPage: PaginatedResponse<Movie>) => {
      return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined;
    },
    enabled: searchInput.trim().length > 0,
  });
};
