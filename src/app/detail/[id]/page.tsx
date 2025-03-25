'use client';

import Poster from '@/components/detail/Poster';
import Info from '@/components/detail/Info';
import { useEffect, useState } from 'react';
import { getMovieDetails, getMovieVideo } from '@/services/serviceMovieDetails';
import { Movie } from '@/types/DetailMovie';
import { TMDB_IMG_URL } from '@/constants/tmdbConstants';
import LinkBtn from '@/components/detail/LinkBtn';

interface Props {
  params: {
    id: number;
  };
}

const mok_user = {
  nickname: 'test1',
  email: 'test1@test.com',
};

const DetailPage = ({ params }: Props) => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [src, setSrc] = useState<string>('');
  const [videoLink, setVideoLink] = useState<string | null>(null);
  const [comments, setComments] = useState<Comment[] | null>(null);

  useEffect(() => {
    const dataFetch = async () => {
      const [_movie, _videoLink] = await Promise.all([
        getMovieDetails(parseInt(params.id)),
        getMovieVideo(parseInt(params.id)),
      ]);

      if (_movie.poster_path) {
        setSrc(`${TMDB_IMG_URL}/${_movie.poster_path}`);
      }
      setMovie(_movie);
      setVideoLink(_videoLink);
      setComments(_comments);
    };
    dataFetch();
  }, []);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <section>
      {src && <Poster src={src} alt={movie.title}></Poster>}
      <section className='flex items-center justify-center gap-[20px]'>
        {videoLink && <LinkBtn link={videoLink} label='예고편 보러가기' />}
        {movie?.homepage && <LinkBtn link={movie.homepage} label='영화 보러가기' />}
      </section>
      <Info movie={movie} />
    </section>
  );
};

export default DetailPage;
