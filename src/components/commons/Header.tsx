import Link from 'next/link';
import MoviesSearch from './MoviesSearch';

const Header = () => {
  return (
    <div className='mx-auto flex max-w-[1200px] gap-10 p-6 max-md:gap-6'>
<<<<<<< HEAD
      <Link href={'/home'}>
=======
      <Link href={'/category'}>
>>>>>>> 689a58ef3cb61b1254cf40b37fbab767f1082f15
        <div className='flex items-center justify-center break-keep rounded-md border border-[#e6354f] px-8 py-4'>
          로고
        </div>
      </Link>
      <MoviesSearch />
    </div>
  );
};

export default Header;
