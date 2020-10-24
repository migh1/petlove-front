/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useCallback } from 'react';
import axios from '../../config/axios';
import { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';

function useRequest() {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const startRequest = () => {
    setLoading(true);
    setError(null);
  };

  const handleResponse = (data: any = {}) => {
    setResponse(data);
    setLoading(false);
  };

  const handleError = (err: any) => {
    setError(err);
    setLoading(false);
  };

  const makeRequest = (
    requestFunc: any,
    url: string,
    params: AxiosRequestConfig
  ) => {
    startRequest();
    requestFunc(url, params)
      .then((res: AxiosResponse) => handleResponse(res.data))
      .catch((err: AxiosError) => handleError(err));
  };

  const _get = useCallback(
    (url, params = {}) => makeRequest(axios.get, url, params),
    []
  );

  return { _get, response, loading, error };
}

export default useRequest;
