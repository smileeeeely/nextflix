import { IMG_PATH } from '@/app/detail/[id]/page';
import { Movie } from '@/types/DetailMovie';
import { formatOverview } from '@/utils/formatFunction';
import Image from 'next/image';

interface Props {
  movie: Movie;
}

const Info = ({ movie }: Props) => {
  return (
    <section className='ml-[20px] flex flex-col'>
      {/* 한 줄 평 */}
      <header className='text-center text-[40px] italic'>"{movie.tagline}"</header>
      {/* 영화 이름 & 장르 내용 */}
      <section className='flex w-full flex-row items-baseline'>
        <h1 className='mr-[20px] text-[40px]'>{movie.title}</h1>

        {movie.genres.map((genre) => {
          // TODO: 추후 genre component 적용
          return <p key={genre.id}>{genre.name}</p>;
        })}
        <ul className='ml-[20px] flex items-baseline gap-[10px] text-[22px]'>
          개봉일<li className='text-[18px]'>{movie.release_date}</li>
          평점
          <li className='flex flex-row items-baseline gap-[5px] text-[18px]'>
            {movie.vote_average}
            <span className='text-[12px]'>({movie.vote_count})</span>
          </li>
          런타임 <li className='text-[18px]'>{movie.runtime}분</li>
        </ul>
      </section>
      {/* 영화 줄거리 */}
      <section>
        <br />
        <h2 className='text-[30px]'>줄거리</h2>
        <p className='whitespace-pre-line'>{formatOverview(movie.overview)}</p>
        <br />
        {movie.homepage && <a href={movie.homepage}>{movie.title} 보러가기</a>}
      </section>
      {/* 제작사 부분 */}
      <section>
        <br />
        <h2 className='text-[30px]'>제작사</h2>
        <div className='flex flex-row items-baseline gap-[30px]'>
          {movie.production_companies.map((company) => {
            return (
              <div key={company.id}>
                {company.logo_path ? (
                  <Image src={IMG_PATH + company.logo_path} width={200} height={100} alt={company.name} />
                ) : (
                  <p>{company.name}</p>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </section>
  );
};

export default Info;
