import { useMutation } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/shared/constants';
import { parseData } from '@/shared/helpers';
import { getQueryClient } from '@/shared/lib/react-query';
import { CreateCourseParams } from '@/shared/types';

import { createCourse } from '../../actions';

export function useMutationCreateCourse() {
  const queryClient = getQueryClient();

  return useMutation({
    mutationKey: [QUERY_KEYS.CREATE_COURSE],
    mutationFn: async (data: CreateCourseParams) => {
      const response = await createCourse(data);

      return parseData(response);
    },
    onSuccess: (response) => {
      if (response?.success) {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.FETCH_COURSES],
        });
      }
    },
  });
}
