import { ALERT_TYPE } from '@/constants/alertType';
import { openAlert } from '@/lib/openAlert';
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
  const { ERROR, SUCCESS, INFO } = ALERT_TYPE;

  const handleIsBookmark = async () => {
    try {
      // 북마킹 되어있을 시
      if (isBookmarked) {
        await deleteMovieBookmark({ movie_id, user_id: user!.id });
        openAlert({ type: INFO, title: '북마크', text: '북마크 삭제 완료!' });
      }
      // 북마킹이 안되어있을 시
      else {
        await insertMovieBookmark({ movie_id, user_id: user!.id });
        openAlert({ type: SUCCESS, title: '북마크', text: '북마크 완료!' });
      }
      onClick();
    } catch (e: Error | any) {
      openAlert({ type: ERROR, text: e.message });
    }
  };

  return (
    <section onClick={handleIsBookmark} className='mb-[5px] mr-[50px] flex flex-col items-end'>
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
