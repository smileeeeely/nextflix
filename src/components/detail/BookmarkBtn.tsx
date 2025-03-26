import { getIsBookmark } from '@/services/detail/serviceBookmarks';
import { Bookmark } from 'lucide-react';
import { useState } from 'react';

const BookmarkBtn = () => {
  // bookmark 상태 넘겨 받아오기
  const [isClicked, SetClicked] = useState(false);

  const mok_user = {
    nickname: 'test1',
    email: 'test1@test.com',
    id: '6538aa12-c21b-416b-ac67-3c071829ecde',
  };

  const onClickedHandler = async () => {
    SetClicked((prev) => !prev);
    await getIsBookmark({ movie_id: 447273, user_id: mok_user.id });
  };

  return (
    <section onClick={onClickedHandler} className='mr-[50px] flex flex-col items-end'>
      <button className='h-[5 0px] w-[40px] text-black'>
        {isClicked ? (
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
