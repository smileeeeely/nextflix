export interface Nickname {
  nickname: string;
}

export interface Comment {
  id: string;
  created_at: string;
  user_id: string;
  content: string;
  movie_id: number;
  users?: Nickname;
}
