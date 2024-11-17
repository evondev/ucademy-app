import { HistoryModelProps } from './models';

export interface HistoryItemData extends Omit<HistoryModelProps, ''> {}
export type CreateHistoryParams = {
  course: string;
  lesson: string;
  checked: boolean | string;
  path: string;
};
