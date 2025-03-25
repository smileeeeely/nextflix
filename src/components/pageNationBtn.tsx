'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { ChevronRight } from 'lucide-react';

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
    <div className='my-[30px] flex place-content-center gap-8'>
      {page > 1 && (
        <ChevronLeft className='cursor-pointer' onClick={() => goToPage(page - 1)}>
          이전
        </ChevronLeft>
      )}
      <p>
        {page} / {totalPages}
      </p>
      {page < totalPages && (
        <ChevronRight className='cursor-pointer' onClick={() => goToPage(page + 1)}>
          다음
        </ChevronRight>
      )}
    </div>
  );
};

export default PageNationBtn;
