import BackButton from '@/components/back-button';
import { Movie } from '@/types/category/now-playing';
import { getTopRated } from '@/utils/tmdb/serverApi';
import React from 'react';

const topRatedPage = async () => {
  const { results } = await getTopRated();
  return (
    <>
      <BackButton />
      <div>
        {results.map((movie: Movie) => {
          return <div key={movie.id}>{movie.title}</div>;
        })}
      </div>
    </>
  );
};

export default topRatedPage;
