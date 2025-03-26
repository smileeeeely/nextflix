'use client';

import MovieCard from '@/components/commons/MovieCard';
import { getMovieDetails } from '@/services/serviceMovieDetails';
import { DetailMovie } from '@/types/DetailMovie';
import { supabase } from '@/utils/supabaseClient';
import { useEffect, useState } from 'react';

interface User {
  id: string;
  email: string;
  nickname: string;
}

const MyPage = () => {
  // 유저 정보 저장 상태 관리
  const [user, setUser] = useState<User | null>(null);

  // 북마크 영화 목록 상태 관리
  const [bookmarkedMovies, setBookmarkedMovies] = useState<DetailMovie[]>([]);

  // 프로필 수정으로 인한 닉네임 상태 관리
  const [userData, setUserData] = useState({
    nickname: '',
  });

  // 프로필 편집 상태 관리
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // 로그인 및 유저 정보 가져오기
  useEffect(() => {
    const loginAndFetchUser = async () => {
      try {
        // 로그인 요청
        const { data, error: loginError } = await supabase.auth.signInWithPassword({
          email: 'sparta@sparta.com',
          password: 'sparta',

          // qweqwe123@qwe.com
          // qweqwe123@qwe.com

          // sparta@sparta.com
          // sparta
        });

        if (loginError) {
          console.error('로그인 실패 : ', loginError);
          return;
        }

        // 로그인된 사용자 정보 가져오기
        const { data: user, error } = await supabase
          .from('users')
          .select('*')
          .eq('email', 'sparta@sparta.com')
          .single();

        if (error) {
          console.error('사용자 정보 가져오기 실패 : ', error);
          return;
        }

        // 가져온 유저 정보 상태 저장
        setUser(user);
        // setUserData({ nickname: user.nickname ?? '' }); // 없어도 될 것 같음
      } catch (error) {
        console.error('사용자 정보 가져오기 실패 : ', error);
      }
    };

    loginAndFetchUser();
  }, []);

  // 유저 정보가 존재할 때, 북마크된 영화 목록 가져오기
  useEffect(() => {
    if (!user) return;

    const fetchBookmarkedMovies = async () => {
      try {
        // 북마크 테이블에서 영화 ID 가져오기
        const { data: bookmarks, error } = await supabase.from('bookmarks').select('movie_id').eq('user_id', user.id);

        if (error) {
          console.error('북마크 가져오기 실패 : ', error);
          return;
        }

        // 가져온 영화 ID로 상세 정보 요청
        const movies = await Promise.all(bookmarks.map((bookmark) => getMovieDetails(bookmark.movie_id)));

        // 가져온 영화 데이터를 상태에 저장
        setBookmarkedMovies(movies);
      } catch (error) {
        console.error('북마크된 영화 정보 가져오기 실패 : ', error);
        return;
      }
    };

    fetchBookmarkedMovies();
  }, [user]); // user가 변경될 때마다 실행

  // 프로필 수정 버튼 클릭 함수
  const toggleEditButton = () => {
    setIsEditingProfile((prev) => !prev);

    if (!isEditingProfile && user) {
      setUserData({ nickname: user.nickname || '' }); // 수정 버튼 클릭 시 기존 닉네임 유지
    }
  };

  // 프로필 수정 시 닉네임 업데이트하는 함수
  const handleSaveProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) return;

    try {
      // Supabase에서 해당 유저의 닉네임 업데이트
      const { error: updateError } = await supabase
        .from('users')
        .update({ nickname: userData.nickname })
        .eq('email', user.email);

      if (updateError) {
        console.error('사용자 닉네임 업데이트 실패 : ', updateError);
        return;
      }

      // 닉네임 상태 업데이트
      setUser((prevUser) => {
        if (!prevUser) return prevUser;

        return { ...prevUser, nickname: userData.nickname };
      });

      // // 닉네임 입력 상태 초기화
      // setUserData({ nickname: '' });

      // // form 리셋
      // e.currentTarget.reset();

      // 프로필 편집 모드 종료
      setIsEditingProfile(false);
    } catch (error) {
      console.error('사용자 정보 업데이트 실패 : ', error);
    }
  };

  return (
    <div className='space-y-10'>
      <div className='flex justify-around'>
        <div>
          <h1>임시 로그인 유저</h1>
          <p>아이디 : {user?.id}</p>
          <p>이메일 : {user?.email}</p>

          {isEditingProfile ? (
            <form onSubmit={handleSaveProfile}>
              <input
                type='text'
                className='border border-black outline-none'
                value={userData.nickname}
                onChange={(e) => setUserData({ nickname: e.target.value })}
              />
              <button type='submit' className='bg-black text-white'>
                수정 완료
              </button>
              <button type='button' onClick={toggleEditButton} className='ml-2'>
                취소
              </button>
            </form>
          ) : (
            <>
              <p>닉네임 : {user?.nickname || '닉네임 없음'}</p>
              <button onClick={toggleEditButton} className='bg-black text-white'>
                프로필 수정
              </button>
            </>
          )}
        </div>
      </div>

      <section className='space-y-4'>
        <h1>북마크 목록</h1>
        <ul className='grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] gap-6'>
          {bookmarkedMovies.map((bookmark) => (
            <li key={bookmark.id}>
              <MovieCard movie={bookmark} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default MyPage;
