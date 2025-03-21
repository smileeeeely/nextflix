import BackButton from '@/components/back-button';
import { Movie } from '@/types/category/now-playing';
import { getPopular } from '@/utils/tmdb/serverApi';
import React from 'react';

const popularPage = async () => {
  const { results } = await getPopular();
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

export default popularPage;
