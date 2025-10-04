import { useMutation } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/shared/constants';
import { parseData } from '@/shared/helpers';
import { getQueryClient } from '@/shared/lib/react-query';
import { UpdateCourseParams } from '@/shared/types';

import { updateCourse } from '../../actions';

export function useMutationUpdateCourse() {
  const queryClient = getQueryClient();

  return useMutation({
    mutationKey: [QUERY_KEYS.UPDATE_COURSE],
    mutationFn: async (data: UpdateCourseParams) => {
      const response = await updateCourse(data);

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
