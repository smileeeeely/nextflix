import { Movie, PaginatedResponse } from '@/types/Movie';
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';

const PARAM_NUMBER = 1;
const BASE_NUMBER = 0;

// 검색어와 페이지 값 받아서 라우트 핸들러로 전달
export const fetchSearchMovies = async ({ input, page = PARAM_NUMBER }: { input: string; page: number }) => {
  const URL = `http://localhost:3000/api/search?title=${input}&page=${page}`; //TODO 배포 후 환경변수로 뺄 것
  const res = await fetch(URL);
  const data: PaginatedResponse<Movie> = await res.json();
  return data;
};

export const useSearchMovies = ({ searchInput = '' }: { searchInput?: string }) => {
  return useInfiniteQuery<PaginatedResponse<Movie>, Error, InfiniteData<PaginatedResponse<Movie>>, string[], number>({
    queryKey: ['useSearchMovies', searchInput],
    initialPageParam: PARAM_NUMBER,
    queryFn: ({ pageParam }) => fetchSearchMovies({ input: searchInput, page: pageParam }),
    getNextPageParam: (lastPage: PaginatedResponse<Movie>) => {
      return lastPage.page < lastPage.total_pages ? lastPage.page + PARAM_NUMBER : undefined; // 페이지 숫자 하나씩 더해가며 다음 페이지 데이터 가져오기
    },
    enabled: searchInput.trim().length > BASE_NUMBER,
  });
};
