import { Movie } from '@/types/DetailMovie';
import { formatOverview } from '@/utils/formatFunction';
import Image from 'next/image';
import WrapperBox from '@/components/detail/WrapperBox';
// import { TMDB_IMG_URL } from '@/constants/tmdbConstants';
import { TMDB_IMG_URL } from '@/constants/tmdbBaseUrl';

interface Props {
  movie: Movie;
}

const Info = ({ movie }: Props) => {
  return (
    <section className='flex flex-col'>
      {/* 한 줄 평 */}
      {movie.tagline && <header className='text-center text-[40px] italic'>"{movie.tagline}"</header>}
      {/* 영화 이름 & 장르 내용 */}
      <WrapperBox>
        <div className='flex flex-row items-baseline'>
          <h1 className='mr-[20px] text-[40px]'>{movie.title}</h1>
          {movie.genres.map((genre) => {
            // TODO: 추후 genre component 적용
            return <p key={genre.id}>{genre.name}</p>;
          })}
        </div>
        <ul className='flex items-baseline gap-[10px] text-[22px]'>
          개봉일<li className='text-[18px]'>{movie.release_date}</li>
          평점
          <li className='flex flex-row items-baseline gap-[5px] text-[18px]'>
            {movie.vote_average}
            <span className='text-[12px]'>({movie.vote_count})</span>
          </li>
          런타임 <li className='text-[18px]'>{movie.runtime}분</li>
        </ul>
      </WrapperBox>
      {/* 영화 줄거리 */}
      <WrapperBox>
        <h2 className='text-[30px]'>줄거리</h2>
        <p className='whitespace-pre-line'>{formatOverview(movie.overview)}</p>
        <br />
        {movie.homepage && (
          <a href={movie.homepage} rel='noreferer' target='_blank'>
            {movie.title} 보러가기
          </a>
        )}
      </WrapperBox>
      {/* 제작사 부분 */}
      <WrapperBox>
        <h2 className='text-[30px]'>제작사</h2>
        <div className='flex flex-row items-baseline gap-[30px]'>
          {movie.production_companies.map((company) => {
            return (
              <div key={company.id}>
                {company.logo_path ? (
                  <Image
                    src={TMDB_IMG_URL + '/t/p/w300' + company.logo_path}
                    width={200}
                    height={100}
                    alt={company.name}
                  />
                ) : (
                  <p>{company.name}</p>
                )}
              </div>
            );
          })}
        </div>
      </WrapperBox>
    </section>
  );
};

export default Info;
