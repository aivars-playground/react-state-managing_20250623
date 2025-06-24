import {useState, useEffect, useMemo, useRef} from "react";

export default function useFetchAll(urls) {

  const previousUrls = useRef([]);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    if (areEqual(previousUrls.current, urls)) {
      setLoading(false)
      return;
    }
    previousUrls.current = urls;

    const promises = urls.map((url) =>
      fetch(process.env.REACT_APP_API_BASE_URL + url).then((response) => {
        if (response.ok) return response.json();
        throw response;
      })
    );

    Promise.all(promises)
      .then((json) => setData(json))
      .catch((e) => {
        console.error(e);
        setError(e);
      })
      .finally(() =>
        setLoading(false));
      }, [urls]);    //<-----call only if URLS have changed!!!!!


  //   // eslint-disable-next-line
  // }, []);                 //<-----do not call on redraws!!!!

  return { data, loading, error };
}

function areEqual(array1, array2) {
  return (
    array1.length === array2.length &&
    array1.every((value, index) => value === array2[index])
  );
}
