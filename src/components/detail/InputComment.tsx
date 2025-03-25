import WrapperBox from '@/components/detail/WrapperBox';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const InputComment = () => {
  const [content, setContent] = useState<string>('');

  const handleInsertComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Insert 연결
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
