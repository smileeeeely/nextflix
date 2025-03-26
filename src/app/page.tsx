'use client';

import MoviesSearch from '@/components/layout/MoviesSearch';
import { HOME } from '@/constants/pagePath';
import Link from 'next/link';

const IntroPage = () => {
  return (
    <div className='px-40 max-lg:px-20 max-sm:px-10'>
      <div className='flex h-screen flex-col items-center justify-center gap-10'>
        <MoviesSearch />
        <Link href={HOME}>바로가기</Link>
      </div>
    </div>
  );
};

export default IntroPage;
