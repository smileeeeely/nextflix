import BackButton from '@/components/back-button';
import { Movie } from '@/types/category/now-playing';
import { getUpcoming } from '@/utils/tmdb/serverApi';
import React from 'react';

const upcomingPage = async () => {
  const { results } = await getUpcoming();
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

export default upcomingPage;
