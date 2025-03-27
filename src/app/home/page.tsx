import { Metadata } from 'next';
import { Suspense } from 'react';
import CategorySection from '@/components/home/CategorySection';
import { getMovies } from '@/services/movieCategory';
import SkeletoneList from '@/components/home/SkeletoneList';
import { CATEGORY } from '@/constants/movieCategory';

export const metadata: Metadata = {
  title: '카테고리별 영화목록',
  description: '카테고리별로 영화목록을 확인할 수 있습니다.',
};

// 카테고리를 타입 정의
interface CategoryAlias {
  name: string;
  key: CATEGORY;
}

const Category = async () => {
  // API 호출 순서를 배열로 정의
  const categories: CategoryAlias[] = [
    { name: '지금 상영중', key: CATEGORY.NOW_PLAYING },
    { name: '인기순', key: CATEGORY.POPULAR },
    { name: '평점순', key: CATEGORY.TOP_RATED },
    { name: '개봉 예정작', key: CATEGORY.UPCOMING },
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
              {/* 에러처리 추가 */}
              {category.name} 영화 데이터를 불러오는데 실패했습니다.
            </h3>
          )}
        </Suspense>
      ))}
    </section>
  );
};
export default Category;
