import MoviesSearch from './MoviesSearch';

const Header = () => {
  return (
    <div className='flex gap-10 p-6 max-md:gap-6'>
      <div className='flex items-center justify-center break-keep rounded-md border border-[#e6354f] px-8 py-4'>
        로고
      </div>
      <MoviesSearch />
    </div>
  );
};

export default Header;
