import { Movie } from '@/types/Movie';
import { Card, CardContent } from '../ui/card';
import Link from 'next/link';
import Image from 'next/image';

type MovieCardProps = {
  movie: Movie;
};

const MovieCard = ({ movie }: MovieCardProps) => {
  //무비카드 컴포넌트 사용시 .map()을 사용하는 로직에서 key 속성을 넣어주는 태그에 w-40 넣어주어야 비율대로 포스터가 나타납니다.
  // 자동 적용되도록 설정해 놓은 상태이기 때문에 영화내용이 담긴 데이터만 props로 넘겨주면 됩니다.
  // 리팩토링시 상수와 utils들은 분리예정입니다.
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
          {/* 평점 부분은 ui 변경예정 */}
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
