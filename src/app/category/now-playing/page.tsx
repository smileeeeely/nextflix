import PageNationBtn from '@/components/pageNationBtn';
import { Movie } from '@/types/category/movie';
import { getNowPlaying } from '@/utils/tmdb/serverApi';
import React from 'react';

const nowPlayingPage = async () => {
  const { results } = await getNowPlaying();
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

export default nowPlayingPage;
