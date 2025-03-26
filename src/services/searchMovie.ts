import { Movie, PaginatedResponse } from '@/types/Movie';
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';

// 검색어와 페이지 값 받아서 라우트 핸들러로 전달
export const fetchSearchMovies = async ({ input, page = 1 }: { input: string; page: number }) => {
  const URL = `http://localhost:3000/api/search?title=${input}&page=${page}`;
  const res = await fetch(URL);
  const data: PaginatedResponse<Movie> = await res.json();
  return data;
};

export const useSearchMovies = ({ searchInput = '' }: { searchInput?: string }) => {
  return useInfiniteQuery<PaginatedResponse<Movie>, Error, InfiniteData<PaginatedResponse<Movie>>, string[], number>({
    queryKey: ['useSearchMovies', searchInput],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => fetchSearchMovies({ input: searchInput, page: pageParam }),
    getNextPageParam: (lastPage: PaginatedResponse<Movie>) => {
      return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined; // 페이지 숫자 하나씩 더해가며 다음 페이지 데이터 가져오기
    },
    enabled: searchInput.trim().length > 0,
  });
};
