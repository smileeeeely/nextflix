'use server';

import { YOUTUBE_BASE_URL } from '@/constants/movieVideoUrl';
import { TMDB_BASE_URL } from '@/constants/tmdbBaseUrl';
import { DetailMovie } from '@/types/DetailMovie';
import { MovieVideos } from '@/types/Video';
import { containsOnlyNumbers } from '@/utils/formatFunction';

export const getMovieDetails = async (id: number): Promise<DetailMovie> => {
  if (!containsOnlyNumbers(id)) {
    throw new Error('movie id 오류!');
  }

  const res = await fetch(`${TMDB_BASE_URL}/${id}?language=ko`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    },
  });

  const data = await res.json();
  if (res.status !== 200) {
    throw new Error('서버 요청 오류!');
  }

  return data as DetailMovie;
};

export const getMovieVideo = async (id: number): Promise<string | null> => {
  const res = await fetch(`${TMDB_BASE_URL}/${id}/videos?language=ko`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    },
  });

  if (res.status !== 200) {
    throw new Error('서버 요청 오류!');
  }
  const data: MovieVideos = await res.json();

  if (data.results) {
    for (const video of data.results) {
      if (video.site === 'YouTube') {
        return YOUTUBE_BASE_URL + video.key;
      }
    }
  }
  return null;
};
