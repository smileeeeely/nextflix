'use client';

import { useState } from 'react';
import { supabase } from '@/utils/supabaseClient';
import { useAuthStore } from '@/store/useAuthStore';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

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
      return <p>오류가 발생했습니다. 다시 시도해주세요!</p>;
    }

    useAuthStore.setState({ user: { ...user, nickname } });
    setIsEditing(false);
  };

  return (
    <div className='flex items-center justify-center p-4'>
      <div className='rounded-md border border-slate-800 px-6 py-4'>
        {isEditing ? (
          <form onSubmit={handleSave} className='flex flex-col items-center justify-center gap-4'>
            <Input
              type='text'
              className='w-36 border border-black outline-none'
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
            <div className='space-x-2'>
              <Button type='submit' className='bg-black text-white'>
                수정 완료
              </Button>
              <Button type='submit' onClick={toggleEdit}>
                취소
              </Button>
            </div>
          </form>
        ) : (
          <div className='flex flex-col items-center justify-center gap-4'>
            <p className='text-xl font-semibold'>닉네임 : {user?.nickname || '닉네임 없음'}</p>
            <Button onClick={toggleEdit}>프로필 수정</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileSection;
