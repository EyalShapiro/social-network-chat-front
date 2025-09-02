import { toast } from 'react-toastify';
import { AxiosError, AxiosResponse } from 'axios';
import { useMutation, UseMutationOptions, useQueryClient, type QueryKey } from '@tanstack/react-query';
import { ERROR_MSG } from '@/constants/errorMsg';

export function useMutationInvalidation<T, R extends object>(
  options: UseMutationOptions<AxiosResponse<R, unknown>, AxiosError<{ message?: string }>, T, unknown> & {
    queryKey: QueryKey[];
  }
) {
  const queryClient = useQueryClient();
  return useMutation<AxiosResponse<R, unknown>, AxiosError<{ message?: string }>, T, unknown>({
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: options.queryKey });

      if ('message' in res.data) toast.success(res.data.message as string);

      return res;
    },
    onError: (error) => {
      const errorMessage = error.message || ERROR_MSG.serverError;
      toast.error(errorMessage);
    },

    ...options,
  });
}
