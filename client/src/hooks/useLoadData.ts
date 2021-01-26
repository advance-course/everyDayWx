import { useState, useEffect } from "react";
import { Result } from "../utils/http";

type APIFunc<T, P> = (params: P) => Promise<Result<T>>;

export default function useLoadData<T, P>(
  api: APIFunc<T, P>,
  params: P,
  defaultData: T
) {
  const [data, setData] = useState<T>(defaultData);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    setLoading(true);
    api(params)
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(err => console.error(err));
    refresh && setRefresh(false);
  }, [refresh]);
  return {
    loading,
    data,
    setRefresh
  };
}
