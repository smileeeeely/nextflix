'use server';
import { API_LANGUAGE, API_PAGE, CATEGORY_ENDPOINTS } from '@/constants/movieCategory';
import { MoviesResponse } from '@/types/Movie';

// 카테고리별 영화목록 가져오기 (ISR)
export const getMovies = async (category: keyof typeof CATEGORY_ENDPOINTS): Promise<MoviesResponse> => {
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) {
    throw new Error('API KEY를 찾을 수 없습니다.');
  }

  const endpoint = CATEGORY_ENDPOINTS[category];
  const url = `${endpoint}?language=${API_LANGUAGE}&page=${API_PAGE}`;

  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'accept': 'application/json',
    },
    next: {
      revalidate: 60 * 60 * 6, // 임시 지정
    },
  });

  if (!response.ok) {
    throw new Error(`영화 정보를 가져오는데 실패했습니다: ${response.statusText}`);
  }

  const data: MoviesResponse = await response.json();
  return data;
};
