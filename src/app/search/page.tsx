'use client';
import { useSearchMovies } from '@/services/searchMovie';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import noImage from '@images/images/noImage.png';
import { TMDB_IMG_URL } from '@/constants/tmdbBaseUrl';
import { Movie } from '@/types/Movie';
import { useInView } from 'react-intersection-observer';

const SearchPage = () => {
  const params = useSearchParams();
  const [searchInput, setSearchInput] = useState<string>('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [ref, inView] = useInView({ threshold: 0 });

  // 들어온 검색값이 없을 경우
  useEffect(() => {
    const input = params.get('title');
    if (!input) {
      return alert('검색 값을 정확히 입력해 주세요');
    }
    setSearchInput(input);
  }, [params, searchInput]);

  const { data, isPending, isError, hasNextPage, fetchNextPage, isFetchingNextPage } = useSearchMovies({ searchInput });
  useEffect(() => {
    if (data?.pages) {
      const movies = data.pages.flatMap((page) => page.results);
      setMovies(movies);
    }
  }, [data]);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isPending) {
    return <div>데이터 불러오는 중...</div>;
  }
  if (isError) {
    return <div>페이지에 문제가 생겼습니다</div>;
  }

  return (
    <div className='w-full p-8'>
      <ul className='grid grid-cols-6 gap-4'>
        {movies.map((movie) => {
          return (
            <li key={movie.id}>
              <Link href={`/detail/${movie.id}`}>
                <div className='w-40 cursor-pointer'>
                  {movie.poster_path ? (
                    <Image
                      src={`${TMDB_IMG_URL}/t/p/w300${movie.poster_path}`}
                      alt={movie.title}
                      width={150}
                      height={225}
                      className='rounded-md'
                    />
                  ) : (
                    <div className='relative cursor-pointer' style={{ aspectRatio: '2/3' }}>
                      <Image
                        src={noImage}
                        alt='noImage'
                        fill
                        sizes='(max-width: 640px) 100vw, 20vw'
                        className='rounded-md object-cover'
                      />
                    </div>
                  )}
                  <p>{movie.vote_average.toFixed(1)}</p>
                </div>
              </Link>
              <h3 className='mt-2 text-base font-semibold'>{movie.title}</h3>
              <p className='text-sm text-gray-400'>
                {new Date(movie.release_date).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </li>
          );
        })}
      </ul>
      <div ref={ref}>{isFetchingNextPage && <div>데이터 불러오는 중...</div>}</div>
    </div>
  );
};
export default SearchPage;
