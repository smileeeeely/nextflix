import { Movie } from '@/types/DetailMovie';

interface Props {
  movie: Movie;
}

const Info = ({ movie }: Props) => {
  return (
    <main className='flex flex-col'>
      <section className='flex w-full flex-row items-end bg-green-300'>
        <h1 className='mr-[20px] text-[30px]'>{movie.title}</h1>

        {movie.genres.map((genre) => {
          // TODO: 추후 genre component 적용
          return <p key={genre.id}>{genre.name}</p>;
        })}
      </section>
      <section>
        <p>{movie.overview}</p>
        {movie.homepage && <a href={movie.homepage}>{movie.title} 보러가기</a>}
      </section>
    </main>
  );
};

export default Info;
