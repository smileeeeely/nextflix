'use client';

import { useState } from 'react';
import { supabase } from '@/utils/supabaseClient';
import { useAuthStore } from '@/store/useAuthStore';

interface ProfileSectionProps {
  user: {
    id: string;
    email: string;
    nickname: string;
  } | null;
}

const ProfileSection = ({ user }: ProfileSectionProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [nickname, setNickname] = useState(user?.nickname || '');

  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
    if (!isEditing && user) {
      setNickname(user.nickname || '');
    }
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;

    const { error } = await supabase.from('users').update({ nickname }).eq('id', user.id);

    if (error) {
      console.error('닉네임 수정 실패:', error.message);
      return;
    }

    useAuthStore.setState({ user: { ...user, nickname } });
    setIsEditing(false);
  };

  return (
    <div className='flex justify-around'>
      <div>
        {isEditing ? (
          <form onSubmit={handleSave}>
            <input
              type='text'
              className='border border-black outline-none'
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
            <button type='submit' className='bg-black text-white'>
              수정 완료
            </button>
            <button type='button' onClick={toggleEdit} className='ml-2'>
              취소
            </button>
          </form>
        ) : (
          <>
            <p>닉네임: {user?.nickname || '닉네임 없음'}</p>
            <button onClick={toggleEdit} className='bg-black text-white'>
              프로필 수정
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileSection;
