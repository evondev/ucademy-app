import { QuerySearchParams } from '@/shared/types';

import { fetchRatings } from '../../actions';
import RatingManageContainer from './components';

async function RatingManagePage({ searchParams }: QuerySearchParams) {
  const ratings = await fetchRatings({
    page: searchParams.page || 1,
    limit: 10,
    search: searchParams.search,
    status: searchParams.status,
  });

  return <RatingManageContainer ratings={ratings} />;
}

export default RatingManagePage;
