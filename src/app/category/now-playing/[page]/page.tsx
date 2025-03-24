import PageNationBtn from '@/components/pageNationBtn';
import { Movie } from '@/types/category/movie';
import { getNowPlaying } from '@/utils/tmdb/serverApi';
import React from 'react';

// 서버 컴포넌트에서 쿼리 파라미터 가져오기
const nowPlayingPage = async ({ params }: { params: { page: null | string } }) => {
  const page = parseInt(params.page || '1'); // 숫자로 변환
  const data = await getNowPlaying(page);
  return (
    <>
      <div>
        <h1>페이지 {page}</h1>
        {data.results.map((movie: Movie) => {
          return <div key={movie.id}>{movie.title}</div>;
        })}
      </div>
      <PageNationBtn page={page} totalPages={data.total_pages} basePath={'category/now-playing'} />
    </>
  );
};

export default nowPlayingPage;
