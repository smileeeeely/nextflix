import { IMG_PATH } from '@/app/detail/[id]/page';
import { Movie } from '@/types/DetailMovie';
import { formatOverview } from '@/utils/formatFunction';
import Image from 'next/image';

interface Props {
  movie: Movie;
}

const Info = ({ movie }: Props) => {
  return (
    <main className='ml-[20px] flex flex-col'>
      <section className='flex w-full flex-row items-end bg-green-300'>
        <h1 className='mr-[20px] text-[30px]'>{movie.title}</h1>

        {movie.genres.map((genre) => {
          // TODO: 추후 genre component 적용
          return <p key={genre.id}>{genre.name}</p>;
        })}
      </section>
      <section>
        <h4 className='whitespace-pre-line'>{formatOverview(movie.overview)}</h4>
        {movie.homepage && <a href={movie.homepage}>{movie.title} 보러가기</a>}
      </section>
      {/* 제작 부분 */}
      <section>
        <h1 className='text-[30px]'>제작사</h1>
        <div className='flex flex-row items-center gap-[30px]'>
          {movie.production_companies.map((company) => {
            // TODO: 추후 genre component 적용
            return (
              <div key={company.id}>
                <Image src={IMG_PATH + company.logo_path} width={200} height={100} alt={company.name} />
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default Info;
