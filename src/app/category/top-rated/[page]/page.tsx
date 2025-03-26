import PageNationBtn from '@/components/category/pageNationBtn';
import { Movie, PaginatedResponse } from '@/types/Movie';
import { getTopRated } from '@/services/category/serverApi';
import React from 'react';
import MovieCard from '@/components/commons/MovieCard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '평점순 영화목록',
  description: '평점순 영화목록을 확인할 수 있습니다.',
};

// 서버 컴포넌트에서 쿼리 파라미터 가져오기
const topRatedPage = async ({ params }: { params: { page: null | string } }) => {
  const page = parseInt(params.page || '1'); // 숫자로 변환
  let data: PaginatedResponse<Movie> | null = null;
  try {
    data = await getTopRated(page);
  } catch (error) {
    console.error('평점순 영화를 불러오는 데 실패하였습니다.', error);
    return <p className='text-center text-red-500'>영화 정보를 불러오는 데 실패했습니다.</p>;
  }
  return (
    <article>
      <section>
        <h2 className='category-title'>평점순</h2>
        <div className='category-grid'>
          {data.results.map((movie: Movie) => {
            return (
              <div key={movie.id} className='mx-auto w-40 place-content-center'>
                <MovieCard movie={movie} />
              </div>
            );
          })}
        </div>
      </section>
      <PageNationBtn page={page} totalPages={data.total_pages} basePath={'category/top-rated'} />
    </article>
  );
};

export default topRatedPage;
