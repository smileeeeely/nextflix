// ScoreDonut파일에서 사용할 컬러 함수
export const getScoreColor = (score: number): string => {
  if (score >= 70) return "#00C776"; // 초록
  if (score >= 50) return "#CED630"; // 노랑
  return "#FF005A"; // 빨강
} 