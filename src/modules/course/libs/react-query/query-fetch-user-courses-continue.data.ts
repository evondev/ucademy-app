import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/shared/constants';

import { fetchUserCoursesContinue } from '../../actions';

interface QueryFetchUserCoursesProps {
  clerkId: string;
}

export const useQueryFetchUserCoursesContinue = ({
  clerkId,
}: QueryFetchUserCoursesProps) => {
  return useQuery({
    enabled: !!clerkId,
    queryKey: [QUERY_KEYS.FETCH_USER_COURSES, clerkId],
    queryFn: async () => {
      const response = await fetchUserCoursesContinue({ clerkId });

      return response || [];
    },
    placeholderData: keepPreviousData,
  });
};
