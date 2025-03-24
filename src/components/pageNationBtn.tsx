'use client';

import { useRouter } from 'next/navigation';
interface PageNationProps {
  page: number;
  totalPages: number;
  basePath: string;
}

const PageNationBtn = ({ page, totalPages, basePath }: PageNationProps) => {
  const router = useRouter();

  const goToPage = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;

    router.push(`/${basePath}/${newPage}`); // 히스토리 스택(방문 기록)에 추가
  };

  return (
    <div className='flex gap-8'>
      {page > 1 && <button onClick={() => goToPage(page - 1)}>이전</button>}
      <p>
        페이지 {page} / {totalPages}
      </p>
      {page < totalPages && <button onClick={() => goToPage(page + 1)}>다음</button>}
    </div>
  );
};

export default PageNationBtn;
