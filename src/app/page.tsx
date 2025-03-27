'use client';

import MoviesSearch from '@/components/layout/MoviesSearch';
import { HOME } from '@/constants/pagePath';
import Image from 'next/image';
import Link from 'next/link';
import logo from '@images/images/logo.png';

const IntroPage = () => {
  return (
    <div className='absolute inset-0 bg-slate-800 bg-cover bg-center bg-no-repeat'>
      <div className='px-40 max-lg:px-20 max-sm:px-10'>
        <div className='flex h-screen flex-col items-center justify-center gap-10'>
          <Link href={HOME}>
            <Image src={logo} alt='NextFlix' width={500} height={350} />
          </Link>
          <MoviesSearch />
        </div>
      </div>
    </div>
  );
};

export default IntroPage;
