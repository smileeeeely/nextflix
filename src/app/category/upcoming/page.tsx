import PageNationBtn from '@/components/pageNationBtn';
import { Movie } from '@/types/category/movie';
import { getUpcoming } from '@/utils/tmdb/serverApi';
import React from 'react';

const upcomingPage = async () => {
  const { results } = await getUpcoming();

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

export default upcomingPage;
