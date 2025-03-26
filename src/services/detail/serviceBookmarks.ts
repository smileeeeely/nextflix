'use server';

import { supabase } from '@/utils/supabaseClient';

export const getIsBookmark = async ({ movie_id, user_id }: { movie_id: number; user_id: string }): Promise<boolean> => {
  const { data: bookmarks, error } = await supabase.from('bookmarks').select().eq('user_id', user_id);

  if (error) {
    throw new Error('데이터 베이스 오류 : 북마크 GET');
  }

  for (const bookmark of bookmarks) {
    if (bookmark.movie_id === movie_id) {
      return true;
    }
  }

  return false;
};

export const insertMovieBookmark = async ({
  movie_id,
  user_id,
}: {
  movie_id: number;
  user_id: string;
}): Promise<boolean> => {
  const { data: bookmark, error } = await supabase.from('bookmarks').insert({ user_id, movie_id }).select();

  if (error) {
    throw new Error('데이터 베이스 오류 : 북마크 INSERT');
  }

  return true;
};

export const deleteMovieBookmark = async ({
  movie_id,
  user_id,
}: {
  movie_id: number;
  user_id: string;
}): Promise<boolean> => {
  const { data: bookmark, error } = await supabase.from('bookmarks').delete().match({ user_id, movie_id });

  if (error) {
    throw new Error('데이터 베이스 오류 : 북마크 DELETE');
  }

  return false;
};
