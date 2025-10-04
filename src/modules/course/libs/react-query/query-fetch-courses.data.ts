import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/shared/constants';
import { QueryFilter } from '@/shared/types';

import { fetchCourses } from '../../actions';

interface QueryFetchCoursesProps extends QueryFilter {}

export const useQueryFetchCourses = (props: QueryFetchCoursesProps) => {
  return useQuery({
    enabled: true,
    queryKey: [QUERY_KEYS.FETCH_COURSES],
    queryFn: async () => {
      const response = await fetchCourses(props);

      return response || [];
    },
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: true,
  });
};
