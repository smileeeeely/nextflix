import { Comment } from '@/types/Comment';
import { formatDate } from '@/utils/formatFunction';
import WrapperBox from '@/components/detail/WrapperBox';
import { Button } from '@/components/ui/button';

interface Props {
  comments: Comment[];
}

const MovieComments = ({ comments }: Props) => {
  // 추후에 상태관리로 유저 로그인 정보 받아오기
  const isLogin = true;

  const mok_user = {
    nickname: 'test1',
    email: 'test1@test.com',
    id: '6538aa12-c21b-416b-ac67-3c071829ecde',
  };

  return (
    <section>
      {comments.map((comment) => {
        return (
          <WrapperBox key={comment.id}>
            <p>{comment.content}</p>
            <p className='flex justify-end'>
              {comment.users?.nickname} · {formatDate(comment.created_at)}
            </p>
            {isLogin && comment.user_id === mok_user.id ? (
              <div className='mt-[10px] flex justify-end'>
                <Button className='h-[25px] hover:bg-[#e6354f]'>삭제</Button>
              </div>
            ) : null}
          </WrapperBox>
        );
      })}
    </section>
  );
};

export default MovieComments;
