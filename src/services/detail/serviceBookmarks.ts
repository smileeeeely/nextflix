'use server';

import { Bookmark } from '@/types/Bookmark';
import { supabase } from '@/utils/supabaseClient';

export const getIsBookmark = async ({ movie_id, user_id }: { movie_id: number; user_id: string }): Promise<boolean> => {
  const { data: bookmarks, error } = await supabase.from('bookmarks').select().eq('user_id', user_id);

  // TODO: 추후 error 처리 필요
  if (error) {
    return false;
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

  // TODO: 추후 error 처리 필요
  if (error) {
    return false;
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

  // TODO: 추후 error 처리 필요
  if (error) return true;

  return false;
};
