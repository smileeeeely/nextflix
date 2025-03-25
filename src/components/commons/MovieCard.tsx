import { Movie } from '@/types/Movie';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import Link from 'next/link';
import Image from 'next/image';

type MovieCardProps = {
  movie: Movie;
};

const MovieCard = ({ movie }: MovieCardProps) => {
  const IMG_BASE_URL = 'https://image.tmdb.org';
  const formattedDate = new Date(movie.release_date).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Card>
      {/* 상세페이지로 이동 */}
      <Link href={`/detail/${movie.id}`}>
        <div className='relative cursor-pointer' style={{ aspectRatio: '2/3' }}>
          <Image
            src={`${IMG_BASE_URL}/t/p/w300${movie.poster_path}`}
            alt={movie.title}
            fill
            sizes='(max-width: 640px) 100vw, 20vw'
            className='rounded-md object-cover'
          />
          <div>{movie.vote_average.toFixed(1)}</div>
        </div>
      </Link>

      <CardContent>
        {/* 영화 제목 */}
        <h3 className='mt-2 text-base font-semibold'>{movie.title}</h3>
        {/* 개봉일 */}
        <p className='mt-1 text-sm text-gray-400'>{formattedDate}</p>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
