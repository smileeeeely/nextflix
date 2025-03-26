'use client';

import { useRouter } from 'next/navigation';
import { startTransition } from 'react';

const GlobalError = ({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) => {
  const { refresh } = useRouter();

  return (
    <html>
      <body>
        <div className='text-center text-3xl font-bold text-[#e6354f]'>
          <h2 className='mt-4'>예상치 못한 에러가 발생했습니다!!</h2>
          <h2>{error.message}</h2>
          <button
            onClick={() =>
              startTransition(() => {
                refresh();
                reset();
              })
            }
            className='rounded-md border border-yellow-300 px-3 py-2 font-semibold'
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
};

export default GlobalError;
