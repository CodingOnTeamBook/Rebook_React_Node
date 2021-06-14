import { useState, useEffect } from 'react';
import axios from 'axios';

type Method = 'get' | 'post' | 'put' | 'delete';

interface IProps {
  url: string;
  method: Method;
  body?: any | null;
  headers?: any | null;
}

const useAxios = ({ url, method, body = null, headers = null }: IProps) => {
  const [response, setResponse] = useState<null | JSON>();
  const [error, setError] = useState<Error>();
  const [loading, setloading] = useState<boolean>(true);

  const fetchData = () => {
    axios[method](
      url,
      headers ? JSON.parse(headers) : null,
      body ? JSON.parse(body) : null
    )
      .then((res: any) => {
        setResponse(res.data);
      })
      .catch((err: Error) => {
        setError(err);
      })
      .finally(() => {
        setloading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [method, url, body, headers]);

  return { response, error, loading };
};

export default useAxios;
