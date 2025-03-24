'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';

const IntroPage = () => {
  const [_title, setTitle] = useState('');
  const [input, setInput] = useState('');
  const router = useRouter();
  let timerId: number | null = null;

  // 입력된 title 쿼리 파라미터로 전달하며 이동
  const handleTitle = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (timerId) {
      clearTimeout(timerId);
    }

    timerId = window.setTimeout(() => {
      //검색 버튼이 여러번 눌릴 경우를 대비해 디바운싱 적용
      router.push(`/search?title=${encodeURIComponent(input)}`); //input값이 set되지 않았을 경우를 대비해 title로 전달
      setInput('');
      timerId = null;
    }, 200);
  };

  //디바운싱으로 input의 마지막 값만 title에 set
  useEffect(() => {
    const debounce = setTimeout(() => {
      return setTitle(input);
    }, 300);
    return () => clearTimeout(debounce);
  }, [input]);

  // 메모리 누수 방지
  useEffect(() => {
    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [timerId]);

  return (
    <div className='px-20'>
      <div className='flex h-screen flex-col items-center justify-center gap-10 px-20'>
        <div className='w-full'>
          <form onSubmit={handleTitle} className='flex items-center justify-between gap-10'>
            <input
              type='text'
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
              placeholder='영화 제목을 입력해주세요'
              required
              className='w-full rounded-md bg-[#e6354f] p-4 text-black placeholder-black outline-none'
            />
            <button type='submit'>검색</button>
          </form>
        </div>
        <Link href='/category'>바로가기</Link>
      </div>
    </div>
  );
};

export default IntroPage;
