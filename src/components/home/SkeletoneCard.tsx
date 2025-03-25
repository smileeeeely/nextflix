const SkeletoneCard = () => {
  return (
    <div className='w-40 flex-none rounded-md border p-2'>
      {/* 포스터 위치 */}
      <div className='relative aspect-[2/3] w-full animate-pulse overflow-hidden rounded-md bg-gray-300' />
      {/* 제목 위치 */}
      <div className='mt-2 h-6 w-3/4 animate-pulse rounded-md bg-gray-300' />
      {/* 개봉일자 위치 */}
      <div className='mt-1 h-4 w-1/2 animate-pulse rounded-md bg-gray-300' />
    </div>
  );
};

export default SkeletoneCard;
