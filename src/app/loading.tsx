import LoadingSpinner from '@/components/commons/LoadingSpinner';

const loading = () => {
  return (
    <div className='flex h-screen items-center justify-center'>
      <LoadingSpinner />
    </div>
  );
};

export default loading;
