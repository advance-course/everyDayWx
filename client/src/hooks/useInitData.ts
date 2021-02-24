import { useState, useEffect } from "react";
import { Result } from "../utils/http";

type initApiFunc<T> = (id: string) => Promise<Result<T>>;
type updateApiFunc<T> = (id: string, params: T) => Promise<Result<string>>;

interface config<T> {
  initApi: initApiFunc<T>;
  updateApi: updateApiFunc<T>;
  id: string;
  params: T;
}

export default function useInitData<T>(config: config<T>) {
  const { initApi, updateApi, id, params } = config;
  const [data, setData] = useState<T>(params);
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      initApi(id)
        .then(res => {
          setData(res.data);
          setLoading(false);
        })
        .catch(err => {
          setErrMsg(err);
          console.error(err);
        });
    }
  }, []);

  const updateData = function(data) {
    return new Promise((resolve, reject) => {
      setLoading(true);
      updateApi(id, data)
        .then(res => {
          setData(data);
          setLoading(false);
          resolve(res);
        })
        .catch(err => {
          setErrMsg(err);
          reject(err);
          console.error(err);
        });
    });
  };

  return {
    loading,
    data,
    errMsg,
    updateData
  };
}
