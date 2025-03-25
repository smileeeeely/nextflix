'use client';

import Poster from '@/components/detail/Poster';
import Info from '@/components/detail/Info';
import { useEffect, useState } from 'react';
import { getMovieDetails, getMovieVideo } from '@/services/serviceMovieDetails';
import { Movie } from '@/types/DetailMovie';
import { TMDB_IMG_URL } from '@/constants/tmdbConstants';
import VideoBtn from '@/components/detail/VideoBtn';

interface Props {
  params: {
    id: string;
  };
}

const DetailPage = ({ params }: Props) => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [src, setSrc] = useState<string>('');
  const [videoLink, setVideoLink] = useState<string | null>(null);

  useEffect(() => {
    const dataFetch = async () => {
      const _movie = await getMovieDetails(parseInt(params.id));
      const _videoLink = await getMovieVideo(parseInt(params.id));

      setSrc(`${TMDB_IMG_URL}/${_movie.poster_path}`);
      setMovie(_movie);
      setVideoLink(_videoLink);
    };
    dataFetch();
  }, []);

  return (
    <main>
      {movie && <Poster src={src} alt={movie.title}></Poster>}
      {videoLink && <VideoBtn videoLink={videoLink} />}
      <Info movie={movie} />
    </main>
  );
};

export default DetailPage;
