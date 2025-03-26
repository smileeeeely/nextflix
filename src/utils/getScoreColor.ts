// ScoreDonut파일에서 사용할 컬러 함수
const SCORE_THRESHOLDS = {
  green: 70,
  yellow: 50,
};

const SCORE_COLORS = {
  green: "#00C776",
  yellow: "#CED630",
  red: "#FF005A",
};

export const getScoreColor = (score: number): string => {
  if (score >= SCORE_THRESHOLDS.green) return SCORE_COLORS.green;
  if (score >= SCORE_THRESHOLDS.yellow) return SCORE_COLORS.yellow;
  return SCORE_COLORS.red;
};