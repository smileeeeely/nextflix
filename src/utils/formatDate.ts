// yyyy년 m월 d일 형식의 날짜 포멧팅
export const formatDate = (dateInput: string | Date): string => {
  const date = new Date(dateInput);
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
