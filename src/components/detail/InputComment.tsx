import WrapperBox from '@/components/detail/WrapperBox';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { insertComment } from '@/services/detail/serviceComments';

interface Props {
  movie_id: number;
  onSubmit: Function;
}

const InputComment = ({ movie_id, onSubmit }: Props) => {
  const [content, setContent] = useState<string>('');

  const mok_user = {
    nickname: 'test1',
    email: 'test1@test.com',
    id: '6538aa12-c21b-416b-ac67-3c071829ecde',
  };

  const handleInsertComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Insert 연결
    const comment = await insertComment({ user_id: mok_user.id, content, movie_id });
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
