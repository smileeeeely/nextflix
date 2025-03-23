import PageNationBtn from '@/components/pageNationBtn';
import { Movie } from '@/types/category/movie';
import { getPopular } from '@/utils/tmdb/serverApi';
import React from 'react';

const popularPage = async () => {
  const { results } = await getPopular();
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

export default popularPage;
