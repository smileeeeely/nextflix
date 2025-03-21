import BackButton from '@/components/back-button';
import { Movie } from '@/types/category/now-playing';
import { getNowPlaying } from '@/utils/tmdb/serverApi';
import React from 'react';

const nowPlayingPage = async () => {
  const { results } = await getNowPlaying();
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

export default nowPlayingPage;
