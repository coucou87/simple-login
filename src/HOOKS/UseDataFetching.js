import { useState, useEffect } from "react";

export default function useDataFetching(dataSource) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    (async function () {
      try {
        const data = await fetch(dataSource , {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
               //myData
            })
        });
        const json = await data.json();

        if (json) {
          setLoading(false);
          setData(json);
        }
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }

      setLoading(false);
    })()
  }, [dataSource]);

  return {
    error,
    loading,
    data
  };
}