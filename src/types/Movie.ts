// 공통 페이징 응답 유틸리티 타입
export interface PaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

// 영화 목록 Response 타입
export interface MoviesResponse extends PaginatedResponse<Movie> {
  dates: Dates;
}

/**
 * Now Playing & Upcoming
 * 개봉일자 및 상영일자 정보 타입
 */
export interface Dates {
  maximum: string;
  minimum: string;
}

// 영화 기본 정보 타입
export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
