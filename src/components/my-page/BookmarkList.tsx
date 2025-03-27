'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabaseClient';
import { getMovieDetails } from '@/services/serviceMovieDetails';
import MovieCard from '@/components/commons/MovieCard';
import { DetailMovie } from '@/types/DetailMovie';

interface BookmarkListProps {
  userId?: string;
}

const BookmarkList = ({ userId }: BookmarkListProps) => {
  const [bookmarkedMovies, setBookmarkedMovies] = useState<DetailMovie[]>([]);

  useEffect(() => {
    if (!userId) return;

    const fetchBookmarkedMovies = async () => {
      const { data: bookmarks, error } = await supabase.from('bookmarks').select('movie_id').eq('user_id', userId);

      if (error) {
        console.error('북마크 조회 실패:', error.message);
        return;
      }

      const movies = await Promise.all(bookmarks.map((bookmark) => getMovieDetails(bookmark.movie_id)));
      setBookmarkedMovies(movies);
    };

    fetchBookmarkedMovies();
  }, [userId]);

  return (
    <section className='space-y-4'>
      <h1>북마크 목록</h1>
      <ul className='grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] gap-6'>
        {bookmarkedMovies.map((bookmark) => (
          <li key={bookmark.id}>
            <MovieCard movie={bookmark} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default BookmarkList;
