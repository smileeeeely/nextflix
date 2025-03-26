import PageNationBtn from '@/components/pageNationBtn';
import { Movie } from '@/types/Movie';
import { getNowPlaying } from '@/services/category/serverApi';
import React from 'react';
import MovieCard from '@/components/commons/MovieCard';

// 서버 컴포넌트에서 쿼리 파라미터 가져오기
const nowPlayingPage = async ({ params }: { params: { page: null | string } }) => {
  const page = parseInt(params.page || '1'); // 숫자로 변환
  const data = await getNowPlaying(page);
  return (
    <article>
      <section>
        <h2 className='category-title'>지금 상영 중</h2>
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
      <PageNationBtn page={page} totalPages={data.total_pages} basePath={'category/now-playing'} />
    </article>
  );
};

export default nowPlayingPage;
