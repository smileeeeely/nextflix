// . 을 기준으로 줄넘김
export const formatOverview = (overview: string): string => {
  return overview.replace(/(?<!\.)\.(?!\.)/g, '.\n');
};

// timestamp를 기준으로 날짜 포멧팅
export const formatDateFull = (createAt: string): string => {
  const date = new Date(createAt);

  if (isNaN(date.getTime())) return '';

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const min = date.getMinutes();

  return `${year}년 ${month}월 ${day}일 ${hour}시 ${min}분`;
};

// yyyy년 m월 d일 형식의 날짜 포멧팅
export const formatDateSimple = (dateInput: string | Date): string => {
  const date = new Date(dateInput);
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const containsOnlyNumbers = (input: number): boolean => {
  return /^\d+$/.test(String(input));
};
