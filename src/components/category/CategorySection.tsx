import { Movie } from '@/types/Movie';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface CategorySectionProps {
  categoryName: string;
  movies: Movie[];
}
// 한글 카테고리명을 영어 slug로 매핑하는 객체
const categorySlugMap: Record<string, string> = {
  '지금 상영중': 'now-playing',
  '인기순': 'popular',
  '평점순': 'top-rated',
  '개봉 예정작': 'upcoming',
};

const CategorySection = ({ categoryName, movies }: CategorySectionProps) => {
  const IMG_BASE_URL = 'https://image.tmdb.org';
  // 한글 카테고리명을 slug로 변환
  const categorySlug = categorySlugMap[categoryName];

  return (
    <section className='w-full p-8'>
      {/* 카테고리명 컴포넌트 영역, 각 영화 카테고리로 이동 */}
      <Link href={`/category/${categorySlug}`}>
        <h2 className='mb-4 inline-block cursor-pointer text-2xl font-bold'>{categoryName}</h2>
      </Link>

      {/* 가로 스크롤을 위한 flex 컨테이너 */}
      <ul className='scroll-container flex justify-start gap-4 overflow-x-auto'>
        {/* 맵 돌리기 */}
        {movies.map((movie) => (
          // 카드컴포넌트 영역 , 각 영화 id로 상세페이지 이동
          <li key={movie.id} className='relative w-40 flex-none text-center'>
            {/* 포스터 영역 */}
            <Link href={`/detail/${movie.id}`}>
              <div className='cursor-pointer'>
                <Image
                  src={`${IMG_BASE_URL}/t/p/w342${movie.poster_path}`}
                  alt={movie.title}
                  width={150}
                  height={225}
                  className='rounded-md'
                />
                {/* 평점 */}
                <p>{movie.vote_average.toFixed(1)}</p>
              </div>
            </Link>
            {/* 영화 제목 */}
            <h3 className='mt-2 text-base font-semibold'>{movie.title}</h3>
            {/* 개봉일 */}
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
    </section>
  );
};

export default CategorySection;
