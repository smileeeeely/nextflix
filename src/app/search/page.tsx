'use client';
import { useSearchMovies } from '@/services/searchMovie';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Movie } from '@/types/Movie';
import { useInView } from 'react-intersection-observer';
import MovieCard from '@/components/commons/MovieCard';
import { ALERT_TYPE } from '@/constants/alertType';
import { openAlert } from '@/lib/openAlert';
import LoadingSpinner from '@/components/commons/LoadingSpinner';

const SearchPage = () => {
  const params = useSearchParams();
  const [searchInput, setSearchInput] = useState<string>('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [ref, inView] = useInView({ threshold: 0 });

  // 들어온 검색값이 없을 경우
  useEffect(() => {
    const input = params.get('title');
    if (!input) {
      const { ERROR } = ALERT_TYPE;
      openAlert({ type: ERROR, text: '검색 값을 정확히 입력해 주세요' });
      return;
    }
    setSearchInput(input);
  }, [params, searchInput]);

  // 검색어에 따른 데이터 가져오기
  const { data, isPending, isError, hasNextPage, fetchNextPage, isFetchingNextPage } = useSearchMovies({ searchInput });
  useEffect(() => {
    if (data?.pages) {
      const movies = data.pages.flatMap((page) => page.results);
      setMovies(movies);
    }
  }, [data]);

  // 스크롤이 바닥에 닿은 경우 다음 페이지 가져오기
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isPending) {
    return <LoadingSpinner />;
  }
  if (isError) {
    return <div>페이지에 문제가 생겼습니다</div>;
  }

  return (
    <div className='w-full p-8'>
      <ul className='category-grid'>
        {movies.map((movie) => {
          return (
            <div key={movie.id} className='mx-auto w-40 place-content-center'>
              <MovieCard movie={movie} />
            </div>
          );
        })}
      </ul>
      <div ref={ref}>{isFetchingNextPage && <div>데이터 불러오는 중...</div>}</div>
    </div>
  );
};
export default SearchPage;
