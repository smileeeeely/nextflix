import PageNationBtn from '@/components/pageNationBtn';
import { Movie } from '@/types/category/movie';
import { getTopRated } from '@/utils/tmdb/serverApi';
import React from 'react';

const topRatedPage = async () => {
  const { results } = await getTopRated();
  return (
    <>
      <div>
        {results.map((movie: Movie) => {
          return <div key={movie.id}>{movie.title}</div>;
        })}
      </div>
      <PageNationBtn />
    </>
  );
};

export default topRatedPage;
