// . 을 기준으로 줄넘김
export const formatOverview = (overview: string): string => {
  return overview.replace(/(?<!\.)\.(?!\.)/g, '.\n');
};

// timestamp를 기준으로 날짜 포멧팅
export const formatDate = (createAt: string): string => {
  const date = new Date(createAt);

  if (isNaN(date.getTime())) return '';

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const min = date.getMinutes();

  return `${year}년 ${month}월 ${day}일 ${hour}시 ${min}분`;
};
