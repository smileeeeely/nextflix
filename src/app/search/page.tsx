'use client';
import { Movie } from '@/types/Movie';
import { fetchSearchMovies } from '@/services/searchMovie';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const SearchPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const params = useSearchParams();
  const input: string | null = params.get('title');

  const IMG_BASE_URL = 'https://image.tmdb.org';

  // 들어온 검색값이 없을 경우
  if (!input) return alert('페이지에 문제가 생겼습니다. 다시 시도해주세요');

  useEffect(() => {
    const fetchMovies = async () => {
      const data: Movie[] = await fetchSearchMovies(input);
      setMovies(data);
    };
    fetchMovies();
  }, [input]);

  if (!movies) {
    return <div>로딩중...</div>;
  }

  return (
    <div className='w-full p-8'>
      <ul className='grid grid-cols-6 gap-4'>
        {movies.map((movie) => (
          <li key={movie.id}>
            <Link href={`/detail/${movie.id}`}>
              <div className='cursor-pointer'>
                <Image
                  src={`${IMG_BASE_URL}/t/p/w342${movie.poster_path}`}
                  alt={movie.title}
                  width={150}
                  height={225}
                  className='rounded-md'
                />
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
        ))}
      </ul>
    </div>
  );
};

export default SearchPage;
