'use server';

import { YOUTUBE_BASE_URL } from '@/constants/movieVideoUrl';
import { TMDB_URL } from '@/constants/tmdbConstants';
import { Movie } from '@/types/DetailMovie';
import { MovieVideos, Video } from '@/types/Video';

export const getMovieDetails = async (id: number): Promise<Movie> => {
  const res = await fetch(`${TMDB_URL}/${id}?language=ko`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    },
  });
  const data: Movie = await res.json();

  return data;
};

export const getMovieVideo = async (id: number): Promise<string | null> => {
  const res = await fetch(`${TMDB_URL}/${id}/videos?language=ko`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    },
  });
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
