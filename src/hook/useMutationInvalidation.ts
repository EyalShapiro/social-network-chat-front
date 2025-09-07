import { toast } from 'react-toastify';
import { AxiosError, AxiosResponse } from 'axios';
import { useMutation, UseMutationOptions, useQueryClient, type QueryKey } from '@tanstack/react-query';
import { ERROR_MSG } from '@/constants/errorMsg';

type MutationOptionsType<R extends object, T> = UseMutationOptions<
  AxiosResponse<R, unknown>,
  AxiosError<{ message?: string }>,
  T,
  T
>;

export function useMutationInvalidation<T, R extends object>(options: MutationOptionsType<R, T>, queryKey: QueryKey) {
  const queryClient = useQueryClient();
  return useMutation<AxiosResponse<R, unknown>, AxiosError<{ message?: string }>, T, unknown>({
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: queryKey });

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
