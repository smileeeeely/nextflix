import { MoviesResponse } from '@/types/Movie';
import POPULAR from './POPULAR';
import TOPRATED from './TOPRATED';
import UPCOMING from './UPCOMING';
import CategorySection from '@/components/category/CategorySection';
import { getMovies } from '@/services/movieCategory';
import { Metadata } from 'next';

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
    <section className='mx-auto max-w-[1200px]'>
      <CategorySection categoryName='지금 상영중' movies={nowPlayingMovies} />
      <CategorySection categoryName='인기순' movies={popularMovies} />
      <CategorySection categoryName='평점순' movies={topRatedMovies} />
      <CategorySection categoryName='개봉 예정작' movies={upComingMovies} />
    </section>
  );
};

export default Category;
