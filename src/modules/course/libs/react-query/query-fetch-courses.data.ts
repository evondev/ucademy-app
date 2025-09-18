import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/shared/constants';

import { fetchCourses } from '../../actions';

export const useQueryFetchCourses = () => {
  return useQuery({
    enabled: true,
    queryKey: [QUERY_KEYS.FETCH_COURSES],
    queryFn: async () => {
      const response = await fetchCourses({});

      return response || [];
    },
    placeholderData: keepPreviousData,
  });
};
