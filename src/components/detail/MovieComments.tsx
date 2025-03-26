import { Comment } from '@/types/Comment';
import { formatDateFull } from '@/utils/formatFunction';
import WrapperBox from '@/components/detail/WrapperBox';
import { Button } from '@/components/ui/button';
import { deleteMovieComment } from '@/services/detail/serviceComments';
import { useAuthStore } from '@/store/useAuthStore';
import { ALERT_TYPE } from '@/constants/alertType';
import { openAlert } from '@/lib/openAlert';

interface Props {
  comments: Comment[];
  onDelete: Function;
}

const MovieComments = ({ comments, onDelete }: Props) => {
  const { isSignedIn, user } = useAuthStore();
  const { ERROR, SUCCESS, INFO, WARNING } = ALERT_TYPE;

  const handleDeleteComment = async (event: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const commentId = event.currentTarget.value;
      const res = await openAlert({
        type: WARNING,
        title: '댓글',
        text: '댓글을 삭제하시겠습니까?',
        buttonText: '삭제',
      });

      if (res!.isConfirmed) {
        await deleteMovieComment(commentId);
        openAlert({ type: INFO, title: '댓글', text: '댓글이 삭제됐습니다!' });
        onDelete(commentId);
      }
    } catch (error: Error | any) {
      openAlert({ type: ERROR, text: error.message });
    }
  };

  return (
    <section>
      {comments.map((comment) => {
        return (
          <WrapperBox key={comment.id}>
            <p>{comment.content}</p>
            <p className='flex justify-end'>
              {comment.users?.nickname} · {formatDateFull(comment.created_at)}
            </p>
            {isSignedIn && comment.user_id === user!.id ? (
              <div className='mt-[10px] flex justify-end'>
                <Button value={comment.id} onClick={handleDeleteComment} className='h-[25px] hover:bg-[#e6354f]'>
                  삭제
                </Button>
              </div>
            ) : null}
          </WrapperBox>
        );
      })}
    </section>
  );
};

export default MovieComments;
