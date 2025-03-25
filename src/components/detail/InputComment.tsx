import React from 'react';
import WrapperBox from '@/components/detail/WrapperBox';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const InputComment = () => {
  return (
    <WrapperBox>
      <div className='flex flex-row items-end gap-[20px]'>
        <Textarea></Textarea>
        <Button className='min-h-[70px] w-[60px]'>입력</Button>
      </div>
    </WrapperBox>
  );
};

export default InputComment;
