import CategorySection from '@/components/home/CategorySection';
import { getMovies } from '@/services/movieCategory';
import { Metadata } from 'next';
import { Suspense } from 'react';
import SkeletoneList from '@/components/home/SkeletoneList';

export const metadata: Metadata = {
  title: '카테고리별 영화목록',
  description: '카테고리별로 영화목록을 확인할 수 있습니다.',
};

const Category = async () => {
  const { results: nowPlayingMovies } = await getMovies('now_playing');
  const { results: popularMovies } = await getMovies('popular');
  const { results: topRatedMovies } = await getMovies('top_rated');
  const { results: upComingMovies } = await getMovies('upcoming');

  return (
    <section>
      <Suspense fallback={<SkeletoneList />}>
        <CategorySection categoryName='지금 상영중' movies={nowPlayingMovies} />
      </Suspense>

      <Suspense fallback={<SkeletoneList />}>
        <CategorySection categoryName='인기순' movies={popularMovies} />
      </Suspense>

      <Suspense fallback={<SkeletoneList />}>
        <CategorySection categoryName='평점순' movies={topRatedMovies} />
      </Suspense>

      <Suspense fallback={<SkeletoneList />}>
        <CategorySection categoryName='개봉 예정작' movies={upComingMovies} />
      </Suspense>
    </section>
  );
};

export default Category;
