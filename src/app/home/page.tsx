import CategorySection from '@/components/category/CategorySection';
import LoadingSpinner from '@/components/commons/LoadingSpinner';
import { getMovies } from '@/services/movieCategory';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: '카테고리별 영화목록',
  description: '카테고리별로 영화목록을 확인할 수 있습니다.',
};

const Category = async () => {
  // const { results: nowPlayingMovies } = await getMovies('now_playing');
  // const { results: popularMovies } = await getMovies('popular');
  // const { results: topRatedMovies } = await getMovies('top_rated');
  // const { results: upComingMovies } = await getMovies('upcoming');
  const nowPlayingPromise = getMovies('now_playing');
  const popularPromise = getMovies('popular');
  const topRatedPromise = getMovies('top_rated');
  const upComingPromise = getMovies('upcoming');

  // Promis.all 병렬처리
  const [nowPlayingMovies, popularMovies, topRatedMovies, upComingMovies] = await Promise.all([
    nowPlayingPromise,
    popularPromise,
    topRatedPromise,
    upComingPromise,
  ]);

  return (
    <section>
      <Suspense fallback={<LoadingSpinner />}>
        <CategorySection categoryName='지금 상영중' movies={nowPlayingMovies.results} />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <CategorySection categoryName='인기순' movies={popularMovies.results} />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <CategorySection categoryName='평점순' movies={topRatedMovies.results} />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <CategorySection categoryName='개봉 예정작' movies={upComingMovies.results} />
      </Suspense>
    </section>
  );
};

export default Category;
