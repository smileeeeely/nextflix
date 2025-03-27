'use client';

import { useEffect, useState } from 'react';
import { getMovieDetails, getMovieVideo } from '@/services/serviceMovieDetails';
import { DetailMovie } from '@/types/DetailMovie';
import { getMovieComments } from '@/services/detail/serviceComments';
import { Comment } from '@/types/Comment';
import MovieComments from '@/components/detail/MovieComments';
import InputComment from '@/components/detail/InputComment';
import { getIsBookmark } from '@/services/detail/serviceBookmarks';
import { TMDB_IMG_URL } from '@/constants/tmdbBaseUrl';
import { useAuthStore } from '@/store/useAuthStore';
import Loading from '@/app/loading';
import NotFound from '@/app/not-found';
import { openAlert } from '@/lib/openAlert';
import { ALERT_TYPE } from '@/constants/alertType';
import ErrorPage from '@/app/detail/[id]/error';
import Image from 'next/image';
import { formatOverview } from '@/utils/formatFunction';
import BookmarkBtn from '@/components/detail/BookmarkBtn';
import LinkBtn from '@/components/detail/LinkBtn';
import { Badge } from '@/components/ui/badge';

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
  const [errorMessage, setErrorMessage] = useState<string>('');

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
      } catch (e: Error | any) {
        setError(true);
        setErrorMessage(e.message);
      }
    };
    dataFetch();
  }, []);

  if (isError) {
    const { ERROR } = ALERT_TYPE;

    if (errorMessage === 'movie id 오류!') {
      openAlert({ type: ERROR, text: errorMessage });
      return <NotFound />;
    } else {
      return <ErrorPage error={new Error(errorMessage)} />;
    }
  }

  if (!movie) {
    return <Loading />;
  }

  // 백드롭 경로
  const backdropSrc = movie.backdrop_path ? `${TMDB_IMG_URL}/t/p/original${movie.backdrop_path}` : 'src';

  return (
    <section>
      <section className='mb-4'>
        {/* 영화 포스터 영역 */}
        <section className='mt-10 flex items-center justify-center'>
          {/* 배경 영역 */}
          <div
            className='absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat opacity-85'
            style={{
              backgroundImage: `url(${backdropSrc})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* 반투명 오버레이 */}
            <div className='absolute inset-0 bg-slate-950/80' />
          </div>

          <div className='relative z-10 mx-auto max-w-5xl'>
            {/* 왼쪽 포스터 */}
            <div className='flex flex-col gap-8 md:flex-row'>
              {/* 포스터영역 */}
              <div className='flex-shrink-0 self-center md:self-start'>
                <Image
                  src={src}
                  width={300}
                  height={400}
                  alt={movie.title}
                  className='shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)]'
                />
                {/* 제작사 정보 */}
                <div className='mt-[-12px] rounded-lg bg-slate-200 p-4'>
                  <h3 className='mt-3 text-lg font-bold'>제작사</h3>
                  <div className='mt-2 flex flex-wrap items-center gap-6'>
                    {movie.production_companies.map((company) => (
                      <div key={company.id} className=''>
                        {company.logo_path ? (
                          <div className='flex flex-col items-center'>
                            <Image
                              src={`${TMDB_IMG_URL}/t/p/w300${company.logo_path}`}
                              width={50}
                              height={24}
                              alt={company.name}
                            />
                            {/* <span className='p-1 text-[12px]'>{company.name}</span> */}
                          </div>
                        ) : (
                          <p>{company.name}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 오른쪽 상세 정보 */}
              <section className='flex flex-col text-slate-50'>
                {/* 제목, 장르 */}
                <div>
                  <h2 className='text-4xl font-bold'>{movie.title}</h2>
                  {movie.genres.map((genre) => (
                    <Badge className='mr-2 mt-3' key={genre.id}>
                      {genre.name}
                    </Badge>
                  ))}
                </div>

                {/* 기본 정보 */}
                <ul className='mt-6'>
                  <li className='text-base'>개봉일 : {movie.release_date}</li>
                  <li className='text-base'>러닝타임 : {movie.runtime}분</li>
                  <li>
                    {' '}
                    평점(카운트) : {movie.vote_average}
                    <span className='ml-1 text-sm'>({movie.vote_count})</span>
                  </li>
                  {/* <ScoreDonut score={movie.vote_average} /> */}
                </ul>

                {/* 예고편, ott 링크 */}
                <div>
                  <section className='flex items-center gap-[20px]'>
                    {videoLink && <LinkBtn link={videoLink} label='예고편 보러가기' />}
                    {movie?.homepage && <LinkBtn link={movie.homepage} label='영화 보러가기' />}
                  </section>
                  {/* 북마크, 항상 보이지만 로그인 했을 시에만 저장 가능하게 하면 좋을듯 */}
                  {isSignedIn && (
                    <BookmarkBtn onClick={onClickedHandler} isBookmarked={isBookmarked} movie_id={movie.id} />
                  )}
                </div>

                {/* 슬로건, 줄거리 */}
                <div>
                  <h4 className='mb-4 text-lg italic'>{movie.tagline}</h4>
                  <h3 className='text-2xl font-bold'>줄거리</h3>
                  <p className='mt-2 whitespace-pre-line'>{formatOverview(movie.overview)}</p>
                </div>
              </section>
            </div>
          </div>
        </section>
      </section>

      {/* 댓글 영역 */}
      <section className='relative z-10 mx-auto mt-16 max-w-5xl px-4'>
        {comments && <MovieComments onDelete={onDeleteCommentsHandler} comments={comments} />}
        {isSignedIn && <InputComment onSubmit={onSubmitCommentsHandler} movie_id={movie.id} />}
      </section>
    </section>
  );
};

export default DetailPage;
