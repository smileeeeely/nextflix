import { Comment } from '@/types/Comment';
import { formatDateFull } from '@/utils/formatFunction';
import WrapperBox from '@/components/detail/WrapperBox';
import { Button } from '@/components/ui/button';
import { deleteMovieComment } from '@/services/detail/serviceComments';
import { useAuthStore } from '@/store/useAuthStore';

interface Props {
  comments: Comment[];
  onDelete: Function;
}

const MovieComments = ({ comments, onDelete }: Props) => {
  const { isSignedIn, user } = useAuthStore();

  const handleDeleteComment = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const commentId = e.currentTarget.value;
    await deleteMovieComment(commentId);
    onDelete(commentId);
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
            {/* TODO: user id 설정  */}
            {isSignedIn && comment.user_id === 'user.id' ? (
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
