import { API_LANGUAGE } from '@/constants/movieCategory';
import { TMDB_SEARCH_URL } from '@/constants/tmdbBaseUrl';
import { NextResponse } from 'next/server';

// 영화 검색 api에 연결된 라우트 핸들러
export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const input: string | null = searchParams.get('title');
  const page: string | null = searchParams.get('page');

  const FETCH_URL = `${TMDB_SEARCH_URL}?query=${input}&include_adult=false&language=${API_LANGUAGE}&page=${page}`;
  try {
    const res = await fetch(FETCH_URL, {
      //겹치는 부분. 추후 리팩토링으로 병합
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
      },
    });
    if (!res) {
      return NextResponse.json({
        message: '영화 정보를 찾을 수 없습니다',
      });
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: JSON.stringify(error) });
  }
};
