'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

const IntroPage = () => {
  const [title, setTitle] = useState('');
  const router = useRouter();

  const handleTitle = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search?=${title}`);
    setTitle('');
  };

  return (
    <div>
      <form onSubmit={handleTitle}>
        <input
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='영화 제목을 입력해주세요'
          required
        />
        <button>검색</button>
      </form>
      <Link href='/category'>바로가기</Link>
    </div>
  );
};

export default IntroPage;
