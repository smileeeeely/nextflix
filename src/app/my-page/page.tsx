'use client';

import ProfileSection from '@/components/my-page/ProfileSection';
import { useAuthStore } from '@/store/useAuthStore';
import BookmarkList from '../../components/my-page/BookmarkList';

const MyPage = () => {
  const { user } = useAuthStore();

  return (
    <div className='flex flex-col gap-20 p-4'>
      <ProfileSection user={user} />
      <BookmarkList userId={user?.id} />
    </div>
  );
};

export default MyPage;
