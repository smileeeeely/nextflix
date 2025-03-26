import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';

const MoviesSearch = () => {
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
    <div className='w-full max-w-[800px]'>
      <form onSubmit={handleTitle} className='flex items-center justify-between gap-10 max-md:gap-6'>
        <input
          type='text'
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          placeholder='영화 제목을 입력해주세요'
          required
          className='w-full rounded-md bg-[#e6354f] px-4 py-2 text-sm text-black placeholder-black outline-none'
        />
        <button type='submit'>
          <Search className='h-5 w-5 text-slate-50' />
        </button>
      </form>
    </div>
  );
};

export default MoviesSearch;
