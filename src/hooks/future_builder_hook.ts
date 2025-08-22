import { useEffect, useState } from "react";

const useFutureBuilder = (url: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      setData(null);
      try {
        const response = await fetch(url);
        const data = await response.json();

        if (response.status === 200) {
          console.log("Data fetched.");
          console.log(data);
          setData(data);
        } else {
          console.log("Error while fetching.");
          const error = new Error(data.message);
          setError(error);
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return {
    isLoading,
    error,
    data,
  };
};

export default useFutureBuilder;

export const useAuthorizedFutureBuilder = (url: string, token: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      setData(null);
      try {
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        console.log(response.status);
        console.log(data);

        if (response.status === 200) {
          console.log("Data fetched.");
          setData(data);
        } else {
          console.log("Error while fetching.");
          const error = new Error(data.message);
          setError(error);
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, token]);

  return {
    isLoading,
    error,
    data,
  };
};
