'use client';


import { MYPAGE, SIGNIN } from '@/constants/pagePath';
import { useAuthStore } from '@/store/useAuthStore';
import Link from 'next/link';

const UserMenu = () => {
  const { user } = useAuthStore();
  const { isSignedIn } = useAuthStore();
  const { logout } = useAuthStore();

  return (
    <div className='flex items-center gap-6 text-slate-50'>
      {isSignedIn && user ? (
        // 로그인 상태 , 컴포넌트 들어갈 부분
        <div className='group relative inline-block'>
          <button className='whitespace-nowrap font-semibold hover:text-[#e6354f]'>{user.nickname}님</button>
          <div className='invisible absolute right-0 top-full z-10 mt-1 w-40 rounded-md border border-gray-200 bg-white opacity-0 shadow transition-all duration-200 group-hover:visible group-hover:opacity-100'>
            <ul className='py-2 text-base font-semibold text-slate-900'>
              <li>
                <Link href={MYPAGE} className='block px-4 py-2 hover:bg-gray-100'>
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
        <Link href={SIGNIN} className='whitespace-nowrap font-semibold hover:text-red-500'>
          로그인
        </Link>
      )}
    </div>
  );
};

export default UserMenu;
