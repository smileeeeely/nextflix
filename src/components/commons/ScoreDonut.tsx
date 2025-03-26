import { getScoreColor } from '@/utils/getScoreColor';

const SCORE_DONUT = {
  centerX: 32, // SVG 원의 중심 X좌표
  centerY: 32, // SVG 원의 중심 Y좌표
  radius: 26, // 도넛, 원의 반지름
  strokeWidth: 6, // 도넛의 선 두께
};

interface ScoreDonutProps {
  score: number;
}

const ScoreDonut = ({ score }: ScoreDonutProps) => {
  // 평점 백분율 변환
  const percentageScore = Math.round(score * 10);
  const { centerX, centerY, radius, strokeWidth } = SCORE_DONUT;
  // 원의 둘레
  const circumference = 2 * Math.PI * radius;
  // 채워지는 도넛의 둘레
  const dashOffset = circumference * (1 - percentageScore / 100);

  return (
    <div className='relative h-9 w-9'>
      <svg viewBox='0 0 64 64' className='h-9 w-9'>
        {/* 회색으로 꽉 채워진 배경 원  */}
        <circle cx={centerX} cy={centerY} r={centerX} fill='#2c2c2c' />
        {/* 회색 배경 도넛 원 */}
        <circle
          className='text-gray-300'
          stroke='currentColor'
          strokeWidth={strokeWidth}
          fill='none'
          cx={centerX}
          cy={centerY}
          r={radius}
        />
        {/* 평점에 따라 채워지는 도넛 원 */}
        <circle
          stroke={getScoreColor(percentageScore)}
          strokeWidth={strokeWidth}
          fill='none'
          cx={centerX}
          cy={centerY}
          r={radius}
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          transform={`rotate(-90 ${centerX} ${centerY})`} // 채워지는 시작점을 12시 방향으로 설정
        />
      </svg>
      {/* 중앙 텍스트 백분율 */}
      <div className='absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white'>
        {percentageScore}%
      </div>
    </div>
  );
};

export default ScoreDonut;
