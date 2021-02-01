import React, { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { Result } from 'utils/http'

export interface Page<T> {
  pageSize?: number,
  current?: number,
  lastPage?: boolean,
  total?: number,
  list: T[]
}

export interface PaginationParam {
  current?: number,
  pageSize?: number,
  refreshing?: boolean,
  increasing?: boolean,
  [key: string]: any
}

export const defPageData = {
  list: [],
  current: 1,
  pageSize: 10,
  lastPage: false,
  total: 0
}

type APIFunc<T, P> = (params: P) => Promise<Result<Page<T>>>

export default function usePagination<T>(
  api: APIFunc<T, PaginationParam>,
  params: { current: number; pageSize: number }
  ) {
  const [queryParams, setQueryParams] = useState(params);
  const [data, setData] = useState<Page<T>>(defPageData);
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [increasing, setIncreasing] = useState(false);
  const [isBottom, setIsBottom] = useState(false);
  const [errMsg, setErrMsg] = useState('')
  
  useEffect(() => {
    if(loading) {
      fetchList(params)
      setQueryParams(params)
    } else {
      return
    }
  }, [loading])

  useEffect(() => {
    if(!data.lastPage && increasing) {
      const newQuery = {
        ...queryParams,
        current: queryParams.current + 1
      }
      setQueryParams(newQuery)
      fetchList(newQuery)
    } else if(data.lastPage){
      setIncreasing(false)
      setIsBottom(true)
    }
  }, [increasing, isBottom])

  const fetchList = (params) => {
    console.log(params)
    return api(params).then(res => {
      setData(res.data);
      if(!data.lastPage && increasing) {
        setList(([...list, ...res.data.list]))
      } else {
        setList(res.data.list)
        setIsBottom(false)
      }
      setLoading(false)
      setIncreasing(false)
      Taro.stopPullDownRefresh()
    }).catch(e => {
      setLoading(false)
      setIncreasing(false)
      setErrMsg(e.message)
      Taro.stopPullDownRefresh();
    })
  }

  return {
    loading,
    increasing,
    isBottom,
    list,
    errMsg,
    setLoading,
    setIncreasing
  }
}