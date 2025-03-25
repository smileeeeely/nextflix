'use server';

import { Comment } from '@/types/Comment';
import { supabase } from '@/utils/supabaseClient';

export const getComments = async (movieId: number): Promise<Comment[] | null> => {
  const { data: comments, error } = await supabase
    .from('comments')
    .select(
      `
        *, 
        users ( nickname )`
    )
    .eq('movie_id', movieId);

  // TODO: 추후 error 처리 필요
  if (error) return null;

  return comments;
};
