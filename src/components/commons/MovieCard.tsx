import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import ScoreDonut from '@/components/commons/ScoreDonut';
import { formatDateSimple } from '@/utils/formatFunction';
import { TMDB_IMG_URL } from '@/constants/tmdbBaseUrl';
import { DetailMovie } from '@/types/DetailMovie';
import { Movie } from '@/types/Movie';

type MovieCardProps = {
  movie: DetailMovie | Movie;
};

const MovieCard = ({ movie }: MovieCardProps) => {
  //무비카드 컴포넌트 사용시 .map()을 사용하는 로직에서 key 속성을 넣어주는 태그에 w-40 넣어주어야 비율대로 포스터가 나타납니다.

  // yyyy년 m월 d일 형식의 날짜 포멧팅
  const formattedDate = formatDateSimple(movie.release_date);

  // poster_path가 유효하지 않으면 noimage.png 사용
  const posterSrc = movie.poster_path ? `${TMDB_IMG_URL}/t/p/w300${movie.poster_path}` : '/images/noImage.png';

  return (
    <Card>
      {/* 상세페이지로 이동 */}
      <Link href={`/detail/${movie.id}`}>
        <div className='relative aspect-[2/3] cursor-pointer'>
          <Image
            src={posterSrc}
            alt={movie.title}
            fill
            sizes='(max-width: 640px) 100vw, 20vw'
            className='rounded-md object-cover'
          />
        </div>
      </Link>

      <CardContent className='relative min-h-[108px] pt-2 text-left'>
        {/* 평점 */}
        <div className='absolute left-[10px] top-[-20px]'>
          <ScoreDonut score={movie.vote_average} />
        </div>

        {/* 영화 제목 */}
        <h3 className='mt-4 text-base font-semibold'>{movie.title}</h3>
        {/* 개봉일 */}
        <p className='mt-1 text-sm text-gray-400'>{formattedDate}</p>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
