'use server';

import { Comment } from '@/types/Comment';
import { supabase } from '@/utils/supabaseClient';

export const getMovieComments = async (movieId: number): Promise<Comment[] | null> => {
  const { data: comments, error } = await supabase
    .from('comments')
    .select(
      `
        *, 
        users ( nickname )`
    )
    .eq('movie_id', movieId);

  if (error) {
    throw new Error('서버 요청 오류!');
  }

  return comments;
};

export const insertMovieComment = async ({
  user_id,
  content,
  movie_id,
}: {
  user_id: string;
  content: string;
  movie_id: number;
}): Promise<Comment> => {
  const { data, error } = await supabase.from('comments').insert({ user_id, content, movie_id }).select();

  // TODO: 추후 error 처리 필요
  if (error) throw error;

  return data[0];
};

export const deleteMovieComment = async (comment_id: string): Promise<void> => {
  const { error } = await supabase.from('comments').delete().eq('id', comment_id);

  // TODO: 추후 error 처리 필요
  if (error) throw error;
};
