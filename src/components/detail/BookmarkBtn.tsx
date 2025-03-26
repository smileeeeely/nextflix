import { deleteMovieBookmark, insertMovieBookmark } from '@/services/detail/serviceBookmarks';
import { useAuthStore } from '@/store/useAuthStore';
import { Bookmark } from 'lucide-react';

interface Props {
  isBookmarked: boolean;
  onClick: Function;
  movie_id: number;
}

const BookmarkBtn = ({ isBookmarked, onClick, movie_id }: Props) => {
  const { user } = useAuthStore();

  const handleIsBookmark = async () => {
    // TODO: alert 처리 필요
    // TODO: user id 변경
    // 북마킹 되어있을 시
    if (isBookmarked) {
      await deleteMovieBookmark({ movie_id, user_id: 'user.id' });
    }
    // 북마킹이 안되어있을 시
    else {
      await insertMovieBookmark({ movie_id, user_id: 'user.id' });
    }
    onClick();
  };

  return (
    <section onClick={handleIsBookmark} className='mr-[50px] flex flex-col items-end'>
      <button className='h-[5 0px] w-[40px] text-black'>
        {isBookmarked ? (
          <Bookmark className='h-full w-full stroke-[#e6354f]' fill='#e6354f' />
        ) : (
          <Bookmark className='h-full w-full' />
        )}
      </button>
      <p>북마크</p>
    </section>
  );
};

export default BookmarkBtn;
