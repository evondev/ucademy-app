import { CommentModelProps } from './models';

export interface CreateCommentParams {
  content: string;
  lesson: string;
  user: string;
  level: number;
  parentId?: string;
  path?: string;
}
export interface CommentItemData extends Omit<CommentModelProps, 'user'> {
  user: {
    name: string;
    avatar: string;
  };
}
