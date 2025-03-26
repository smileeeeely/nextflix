const SkeletoneCard = () => {
  const SKELETON_STYLE = `animate-pulse rounded-md bg-gray-300`;

  return (
    <div className='w-40 flex-none rounded-md border p-2'>
      {/* 포스터 위치 */}
      <div className={`${SKELETON_STYLE} relative aspect-[2/3] w-full overflow-hidden`} />
      {/* 제목 위치 */}
      <div className={`${SKELETON_STYLE} mt-2 h-6 w-3/4`} />
      {/* 개봉일자 위치 */}
      <div className={`${SKELETON_STYLE} mt-1 h-3 w-1/2`} />
    </div>
  );
};

export default SkeletoneCard;
