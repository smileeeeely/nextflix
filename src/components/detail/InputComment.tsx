import WrapperBox from '@/components/detail/WrapperBox';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { insertMovieComment } from '@/services/detail/serviceComments';
import { useAuthStore } from '@/store/useAuthStore';

interface Props {
  movie_id: number;
  onSubmit: Function;
}

const InputComment = ({ movie_id, onSubmit }: Props) => {
  const [content, setContent] = useState<string>('');
  const { user } = useAuthStore();

  const handleInsertComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: user id 설정
    const comment = await insertMovieComment({ user_id: 'user.id', content, movie_id });
    if (comment) {
      onSubmit(comment);
      setContent('');
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
