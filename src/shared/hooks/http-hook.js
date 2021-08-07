import { useEffect, useRef, useState } from "react";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const activeHttRequests = useRef([]);
  console.log('activeHttRequests', activeHttRequests);

  // TODO wrap @sendRequest function with @useCallback 
  const sendRequest = async (url, method = "GET", body = null, headers = {}) => {
    const httpAbortCtrl = new AbortController();
  console.log('httpAbortCtrl', httpAbortCtrl);
  activeHttRequests.current.push(httpAbortCtrl);
    setIsLoading(true);
    try {
      const response = await fetch(url, {
        method,
        body,
        headers,
        signal: httpAbortCtrl.signal
      });

      const parsedResponse = await response.json();

      // TODO Commit in remove the request controller that's used for this request
      // activeHttRequests.current = activeHttRequests.current.filter(reqCtrl => reqCtrl !== httpAbortCtrl);

      if (!response.ok) {
        throw new Error(parsedResponse.message);
      }
      setIsLoading(false);
      return parsedResponse;
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
      throw error;
    };
  };

  const clearError = () => setError(null);

  useEffect(() => {
    /**
     * When we @return a function from @useEffect this function will executed when component 
     * is destroyed(unmounted) OR before the @useEffect runs again
     *  */
    return () => {
      // * Here we cancel all HTTP requests when their component is unmounted(destroyed)
      activeHttRequests.current.forEach(abortCtrl => abortCtrl.abort());
    }
  }, [])

  return { isLoading, sendRequest, clearError, error };
}