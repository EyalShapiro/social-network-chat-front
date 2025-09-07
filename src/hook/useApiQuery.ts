import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

interface ApiResponse<T> {
  data: T;
}

function useApiQuery<TData, TQueryKey extends QueryKey = QueryKey>(
  queryKey: TQueryKey,
  fetchFn: () => Promise<ApiResponse<TData>>,
  options?: UseQueryOptions<ApiResponse<TData>, AxiosError>
) {
  return useQuery<ApiResponse<TData>, AxiosError>({
    queryKey,
    queryFn: fetchFn,
    throwOnError: (error) => {
      console.error('error in useApiQuery:', error);
      throw error;
    },
    ...options,
  });
}

export default useApiQuery;
