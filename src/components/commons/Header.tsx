'use client';

import React from 'react';
import Link from 'next/link';
import MoviesSearch from './MoviesSearch';
import { useAuthStore } from '@/store/useAuthStore';

const Header = () => {
  const { user } = useAuthStore();
  const { isSignedIn } = useAuthStore();
  const { logout } = useAuthStore();

  return (
    <header className='mx-auto flex max-w-[1200px] gap-10 bg-slate-800 p-6 max-md:gap-6'>
      <div className='flex items-center justify-between'>
        {/* 로고, 카테고리 */}
        <div className='flex items-center gap-8'>
          {/* 로고 */}
          <Link href={'/home'}>
            <h1 className='text-3xl font-bold'>Logo</h1>
          </Link>

          {/* 카테고리 메뉴 */}
          <div className='group relative inline-block'>
            <button className='hover:underline'>카테고리</button>
            <div className='invisible absolute left-0 top-full z-10 mt-2 w-40 rounded-md border border-gray-200 bg-white opacity-0 shadow transition-all group-hover:visible group-hover:opacity-100'>
              <ul className='py-2'>
                <li>
                  <Link href='/category/now-playing/1' className='block px-4 py-2 hover:bg-gray-100'>
                    현재 상영 중
                  </Link>
                </li>
                <li>
                  <Link href='/category/popular/1' className='block px-4 py-2 hover:bg-gray-100'>
                    인기 영화
                  </Link>
                </li>
                <li>
                  <Link href='/category/top-rated/1' className='block px-4 py-2 hover:bg-gray-100'>
                    높은 평점
                  </Link>
                </li>
                <li>
                  <Link href='/category/upcoming/1' className='block px-4 py-2 hover:bg-gray-100'>
                    개봉 예정작
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 검색영역 */}
      <MoviesSearch />

      {/* 로그인 여부에 따른 메뉴 분기 */}
      <div className='flex items-center gap-6'>
        {isSignedIn && user ? (
          // 로그인 상태
          <div className='group relative inline-block'>
            <button className='hover:underline'>{user.nickname}님</button>
            <div className='invisible absolute right-0 top-full z-10 mt-2 w-40 rounded-md border border-gray-200 bg-white opacity-0 shadow transition-all group-hover:visible group-hover:opacity-100'>
              <ul className='py-2'>
                <li>
                  <Link href='/mypage' className='block px-4 py-2 hover:bg-gray-100'>
                    마이페이지
                  </Link>
                </li>
                <li>
                  <button onClick={logout} className='block w-full px-4 py-2 text-left hover:bg-gray-100'>
                    로그아웃
                  </button>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          // 비로그인 상태
          <Link href='/sign-in' className='hover:underline'>
            로그인
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
