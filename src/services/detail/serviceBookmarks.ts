'use server';

import { Bookmark } from '@/types/Bookmark';
import { supabase } from '@/utils/supabaseClient';

export const getIsBookmark = async ({ movie_id, user_id }: { movie_id: number; user_id: string }): Promise<boolean> => {
  const { data: bookmarks, error } = await supabase.from('bookmarks').select().eq('user_id', user_id);

  // TODO: 추후 error 처리 필요
  if (error) throw null;

  for (const bookmark of bookmarks) {
    if (bookmark.movie_id === movie_id) {
      return true;
    }
  }

  return false;
};
