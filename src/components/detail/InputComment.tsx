import WrapperBox from '@/components/detail/WrapperBox';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { insertMovieComment } from '@/services/detail/serviceComments';
import { useAuthStore } from '@/store/useAuthStore';
import { openAlert } from '@/lib/openAlert';
import { ALERT_TYPE } from '@/constants/alertType';

interface Props {
  movie_id: number;
  onSubmit: Function;
}

const InputComment = ({ movie_id, onSubmit }: Props) => {
  const [content, setContent] = useState<string>('');
  const { user } = useAuthStore();
  const { ERROR, SUCCESS } = ALERT_TYPE;

  const handleInsertComment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (!content) {
        openAlert({ type: ERROR, text: '댓글 내용이 없습니다!' });
      } else {
        const comment = await insertMovieComment({ user_id: user!.id, content, movie_id });
        openAlert({ type: SUCCESS, title: '댓글', text: '댓글 작성이 완료되었습니다!' });
        if (comment) {
          onSubmit(comment);
          setContent('');
        }
      }
    } catch (error: Error | any) {
      openAlert({ type: ERROR, text: error.message });
    }
  };

  return (
    <WrapperBox>
      <form onSubmit={handleInsertComment} className='flex flex-row items-end gap-[20px]'>
        <Textarea value={content} onChange={(e) => setContent(e.target.value)}></Textarea>
        <Button type='submit' className='min-h-[70px] w-[60px]'>
          입력
        </Button>
      </form>
    </WrapperBox>
  );
};

export default InputComment;
