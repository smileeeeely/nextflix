import CategorySection from '@/components/home/CategorySection';
import { getMovies } from '@/services/movieCategory';
import { Metadata } from 'next';
import { Suspense } from 'react';
import SkeletoneList from '@/components/home/SkeletoneList';

export const metadata: Metadata = {
  title: '카테고리별 영화목록',
  description: '카테고리별로 영화목록을 확인할 수 있습니다.',
};

// 카테고리를 타입 정의
interface Category {
  name: string;
  key: 'now_playing' | 'popular' | 'top_rated' | 'upcoming';
}

const Category = async () => {
  // API 호출 순서를 배열로 정의
  const categories: Category[] = [
    { name: '지금 상영중', key: 'now_playing' },
    { name: '인기순', key: 'popular' },
    { name: '평점순', key: 'top_rated' },
    { name: '개봉 예정작', key: 'upcoming' },
  ];

  // Promise.allSettled로 병렬 처리
  const results = await Promise.allSettled(categories.map((category) => getMovies(category.key)));

  // 각 카테고리별 성공/실패 결과 맵핑
  const categoryResults = categories.map((category, index) => {
    const result = results[index];
    if (result.status === 'fulfilled') {
      return {
        ...category,
        movies: result.value.results,
      };
    } else {
      return {
        ...category,
        movies: null,
        error: result.reason,
      };
    }
  });

  return (
    <section>
      {categoryResults.map((category) => (
        <Suspense key={category.key} fallback={<SkeletoneList />}>
          {category.movies ? (
            <CategorySection categoryName={category.name} movies={category.movies} />
          ) : (
            <h3 className='p-10 text-center text-xl font-semibold'>
              {category.name} 데이터를 불러오는데 실패했습니다.
            </h3>
          )}
        </Suspense>
      ))}
    </section>
  );
};

export default Category;
