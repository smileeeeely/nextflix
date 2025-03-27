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
        return <p>오류가 발생했습니다. 다시 시도해주세요!</p>;
      }

      const movies = await Promise.all(bookmarks.map((bookmark) => getMovieDetails(bookmark.movie_id)));
      setBookmarkedMovies(movies);
    };

    fetchBookmarkedMovies();
  }, [userId]);

  return (
    <section className='space-y-5'>
      <h2 className='text-3xl font-bold'>북마크 목록</h2>
      <ul className='grid grid-cols-[repeat(auto-fill,_minmax(160px,_1fr))] gap-6'>
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
