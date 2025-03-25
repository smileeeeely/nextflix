import { Movie } from '@/types/Movie';
import Link from 'next/link';
import MovieCard from '../commons/MovieCard';

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
  // 한글 카테고리명을 slug로 변환
  const categorySlug = categorySlugMap[categoryName];

  return (
    <section className='w-full p-8'>
      {/* 카테고리명 컴포넌트 영역, 각 영화 카테고리로 이동 */}
      <Link href={`/category/${categorySlug}/1`}>
        <h2 className='mb-4 inline-block cursor-pointer text-2xl font-bold'>{categoryName}</h2>
      </Link>

      {/* 가로 스크롤을 위한 flex 컨테이너 */}
      <ul className='scroll-container flex justify-start gap-7 overflow-x-auto'>
        {/* 맵 돌리기 */}
        {movies.map((movie) => (
          // 카드컴포넌트 영역 , 각 영화 id로 상세페이지 이동
          <li key={movie.id} className='relative mb-4 w-40 flex-none text-center'>
            {/* 포스터 영역 */}
            <MovieCard movie={movie} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default CategorySection;
