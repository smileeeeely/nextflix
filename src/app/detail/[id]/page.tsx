'use client';

import Poster from '@/components/detail/Poster';
import Info from '@/components/detail/Info';
import { useEffect, useState } from 'react';
import { getMovieDetails, getMovieVideo } from '@/services/serviceMovieDetails';
import { Movie } from '@/types/DetailMovie';
import { TMDB_IMG_URL } from '@/constants/tmdbConstants';

interface Props {
  params: {
    id: string;
  };
}

const DetailPage = ({ params }: Props) => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [src, setSrc] = useState<string>('');

  useEffect(() => {
    const dataFetch = async () => {
      const movie = await getMovieDetails(parseInt(params.id));
      await getMovieVideo(parseInt(params.id));
      setSrc(`${TMDB_IMG_URL}/${movie.poster_path}`);
      setMovie(movie);
    };
    dataFetch();
  }, []);

  return (
    <main>
      {movie && <Poster src={src} alt={movie.title}></Poster>}
      <Info movie={movie} />
    </main>
  );
};

export default DetailPage;
