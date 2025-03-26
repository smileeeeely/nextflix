'use client';

import React from 'react';
import Link from 'next/link';
import MoviesSearch from '@/components/layout/MoviesSearch';
import CategoryDropdown from '@/components/layout/CategoryDropdown';
import UserMenu from '@/components/layout/UserMenu';
import Image from 'next/image';

const Header = () => {
  return (
    <header className='sticky top-0 z-50 flex bg-slate-800 p-4'>
      <nav className='mx-auto flex w-full max-w-[1200px] items-center justify-between gap-10 px-8'>
        {/* 로고, 카테고리 */}
        <section className='flex items-center gap-8 text-slate-50'>
          {/* 로고 크기 고정 */}
          <h1>
            <div className='relative h-[35px] w-[50px]'>
              <Link href={'/home'}>
                <Image src='/images/logo.png' alt='NextFlix' fill className='object-cover' />
              </Link>
            </div>
          </h1>

          {/* 카테고리 메뉴 컴포넌트 */}
          <CategoryDropdown />
        </section>

        {/* 검색영역 */}
        <MoviesSearch />

        {/* 로그인 여부에 따른 메뉴 분기 컴포넌트*/}
        <UserMenu />
      </nav>
    </header>
  );
};

export default Header;
