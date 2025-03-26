'use client';

import Poster from '@/components/detail/Poster';
import Info from '@/components/detail/Info';
import { useEffect, useState } from 'react';
import { getMovieDetails, getMovieVideo } from '@/services/serviceMovieDetails';
import { DetailMovie, ErrorMessage } from '@/types/DetailMovie';
import LinkBtn from '@/components/detail/LinkBtn';
import { getMovieComments } from '@/services/detail/serviceComments';
import { Comment } from '@/types/Comment';
import MovieComments from '@/components/detail/MovieComments';
import InputComment from '@/components/detail/InputComment';
import BookmarkBtn from '@/components/detail/BookmarkBtn';
import { getIsBookmark } from '@/services/detail/serviceBookmarks';
import { TMDB_IMG_URL } from '@/constants/tmdbBaseUrl';
import { useAuthStore } from '@/store/useAuthStore';
import Loading from '@/app/loading';
import NotFound from '@/app/not-found';
import { openAlert } from '@/lib/openAlert';
import { ALERT_TYPE } from '@/constants/alertType';

interface Props {
  params: {
    id: number;
  };
}

const DetailPage = ({ params }: Props) => {
  const [movie, setMovie] = useState<DetailMovie>();
  const [src, setSrc] = useState<string>('');
  const [videoLink, setVideoLink] = useState<string | null>(null);
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [isBookmarked, setBookmarked] = useState(false);
  const [isError, setError] = useState(false);

  const { isSignedIn, user } = useAuthStore();

  // Insert Handler
  const onSubmitCommentsHandler = (comment: Comment) => {
    setComments((prev) =>
      prev
        ? [...prev, { ...comment, users: { nickname: user!.nickname } }]
        : [{ ...comment, users: { nickname: user!.nickname } }]
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
      try {
        const [_movie, _videoLink, _comments, _isBookmarked] = await Promise.all([
          getMovieDetails(params.id),
          getMovieVideo(params.id),
          getMovieComments(params.id),
          isSignedIn ? getIsBookmark({ movie_id: params.id, user_id: user!.id }) : false,
        ]);

        if (_movie.poster_path) {
          setSrc(`${TMDB_IMG_URL}/t/p/w300/${_movie.poster_path}`);
        }

        setMovie(_movie);
        setVideoLink(_videoLink);
        setComments(_comments);
        setBookmarked(_isBookmarked);
      } catch (e) {
        setError(true);
      }
    };
    dataFetch();
  }, []);

  if (isError) {
    const { ERROR } = ALERT_TYPE;
    openAlert({ type: ERROR, text: '서버 요청 오류' });
    return <NotFound />;
  }

  if (!movie) {
    return <Loading />;
  }

  return (
    <section>
      {src && <Poster src={src} alt={movie.title}></Poster>}
      <section className='flex items-center justify-center gap-[20px]'>
        {videoLink && <LinkBtn link={videoLink} label='예고편 보러가기' />}
        {movie?.homepage && <LinkBtn link={movie.homepage} label='영화 보러가기' />}
      </section>
      {isSignedIn && <BookmarkBtn onClick={onClickedHandler} isBookmarked={isBookmarked} movie_id={movie.id} />}
      {movie && <Info movie={movie} />}
      {comments && <MovieComments onDelete={onDeleteCommentsHandler} comments={comments} />}
      {isSignedIn && <InputComment onSubmit={onSubmitCommentsHandler} movie_id={movie.id} />}
    </section>
  );
};

export default DetailPage;
