export const formatOverview = (overview: string): string => {
  return overview.replace(/(?<!\.)\.(?!\.)/g, '.\n');
};

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
