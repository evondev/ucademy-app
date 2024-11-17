import { RatingManagePage } from '@/modules/rating/pages';
import { QuerySearchParams } from '@/shared/types';

function RatingPageRoot({ searchParams }: QuerySearchParams) {
  return <RatingManagePage searchParams={searchParams} />;
}

export default RatingPageRoot;
