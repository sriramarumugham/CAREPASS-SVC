import axios, { AxiosRequestConfig } from 'axios';
import { currentUserNameSpace } from '../app';

function generateQueryParams(
  dynamicParams: Record<string, string | number>,
): string {
  const queryParams = Object.entries(dynamicParams)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
    )
    .join('&');
  return Object.entries(dynamicParams).length > 0 ? `?${queryParams}` : '';
}

type HttpMethod = 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT';

interface ApiRequestParams<T> {
  method: HttpMethod;
  url: string;
  data?: any;
  headers?: Record<string, string>;
  query?: any;
}

const apiRequest = async <T>({
  method,
  url,
  data,
  headers = {},
  query,
}: ApiRequestParams<T>): Promise<T> => {
  const authToken = currentUserNameSpace.get('authToken');
  if (authToken) {
    headers['Authorization'] = authToken;
  }

  const validMethods: HttpMethod[] = ['GET', 'POST', 'DELETE', 'PATCH', 'PUT'];

  if (!validMethods.includes(method)) {
    throw new Error(`Invalid HTTP method: ${method}`);
  }

  const queryParams = query ? generateQueryParams(query) : '';
  const axiosConfig: AxiosRequestConfig = {
    method,
    url: `${url}${queryParams}`,
    headers,
  };

  if (['POST', 'PATCH'].includes(method)) {
    axiosConfig.data = data;
  }

  try {
    const response = await axios(axiosConfig);
    return response?.data as T;
  } catch (error: any) {
    error.message = error?.response?.data?.message || error?.message;
    error.status = error?.response?.status || error?.status;
    throw error;
  }
};

export { apiRequest };
