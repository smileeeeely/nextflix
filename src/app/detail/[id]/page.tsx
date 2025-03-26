'use client';

import Poster from '@/components/detail/Poster';
import Info from '@/components/detail/Info';
import { useEffect, useState } from 'react';
import { getMovieDetails, getMovieVideo } from '@/services/serviceMovieDetails';
import { DetailMovie } from '@/types/DetailMovie';
import { TMDB_IMG_URL } from '@/constants/tmdbConstants';
import LinkBtn from '@/components/detail/LinkBtn';
import { getMovieComments } from '@/services/detail/serviceComments';
import { Comment } from '@/types/Comment';
import MovieComments from '@/components/detail/MovieComments';
import InputComment from '@/components/detail/InputComment';
import BookmarkBtn from '@/components/detail/BookmarkBtn';
import { getIsBookmark } from '@/services/detail/serviceBookmarks';

interface Props {
  params: {
    id: number;
  };
}

const DetailPage = ({ params }: Props) => {
  const [movie, setMovie] = useState<DetailMovie | null>(null);
  const [src, setSrc] = useState<string>('');
  const [videoLink, setVideoLink] = useState<string | null>(null);
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [isBookmarked, setBookmarked] = useState(false);

  const mok_user = {
    nickname: 'test1',
    email: 'test1@test.com',
    id: '6538aa12-c21b-416b-ac67-3c071829ecde',
  };

  // Insert Handler
  const onSubmitCommentsHandler = (comment: Comment) => {
    setComments((prev) =>
      prev
        ? [...prev, { ...comment, users: { nickname: mok_user.nickname } }]
        : [{ ...comment, users: { nickname: mok_user.nickname } }]
    );
  };

  // Delete Handler
  const onDeleteCommentsHandler = (commentId: string) => {
    setComments((prev) => (prev ? prev.filter((comment) => comment.id !== commentId) : []));
  };

  // Bookmark handler
  const onClickedHandler = () => {
    setBookmarked((prev) => !prev);
  };

  useEffect(() => {
    const dataFetch = async () => {
      const [_movie, _videoLink, _comments, _isBookmarked] = await Promise.all([
        getMovieDetails(params.id),
        getMovieVideo(params.id),
        getMovieComments(params.id),
        getIsBookmark({ movie_id: params.id, user_id: mok_user.id }),
      ]);

      if (_movie.poster_path) {
        setSrc(`${TMDB_IMG_URL}/${_movie.poster_path}`);
      }

      setMovie(_movie);
      setVideoLink(_videoLink);
      setComments(_comments);
      setBookmarked(_isBookmarked);
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
      <BookmarkBtn onClick={onClickedHandler} isBookmarked={isBookmarked} movie_id={movie.id} />
      <Info movie={movie} />
      {comments && <MovieComments onDelete={onDeleteCommentsHandler} comments={comments} />}
      <InputComment onSubmit={onSubmitCommentsHandler} movie_id={movie.id} />
    </section>
  );
};

export default DetailPage;
