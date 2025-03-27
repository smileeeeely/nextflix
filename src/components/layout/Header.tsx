'use client';

import React from 'react';
import Link from 'next/link';
import MoviesSearch from '@/components/layout/MoviesSearch';
import CategoryDropdown from '@/components/layout/CategoryDropdown';
import UserMenu from '@/components/layout/UserMenu';
import Image from 'next/image';
import logo from '@images/images/logo.png';

const Header = () => {
  return (
    <header className='sticky top-0 z-50 flex bg-slate-800 p-4'>
      <nav className='mx-auto flex w-full max-w-[1200px] items-center justify-between gap-10 px-8'>
        {/* 로고, 카테고리 */}
        <section className='flex items-center gap-8 text-slate-50'>
          {/* 로고 */}
          <h1>
            <Link href={'/home'}>
              <Image src={logo} alt='NextFlix' width={50} height={35} className='object-cover' />
            </Link>
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
