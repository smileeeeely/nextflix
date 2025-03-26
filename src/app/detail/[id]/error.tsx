'use client';
import { useRouter } from 'next/navigation';

const Error = ({ error }: { error: Error & { digest?: string } }) => {
  const { push } = useRouter();
  return (
    <section className='max-w-custom container m-auto grid min-h-[calc(100vh-70px-145px)] place-items-center text-center'>
      <article className='flex flex-col items-center justify-center gap-8'>
        <div className='text-3xl font-bold text-[#e6354f]'>
          <p className='mt-4'>{error.message}</p>
        </div>
        <div>
          <button onClick={() => push('/home')} className='rounded-md border border-primary px-2 py-1.5'>
            Go Home
          </button>
        </div>
      </article>
    </section>
  );
};
export default Error;
