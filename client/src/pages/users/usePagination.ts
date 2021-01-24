import React, { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'

import {Userinfo} from 'api/user'

export interface Page<T> {
  pageSize?: number,
  current?: number,
  lastPage?: boolean,
  total?: number,
  list: T[]
}

export const defPageData = {
  list: [],
  current: 1,
  pageSize: 10,
  lastPage: false,
  total: 0
}

export default function usePagination(api, params) {
  const [queryParams, setQueryParams] = useState(params);
  const [data, setData] = useState<Page<Userinfo>>(defPageData);
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if(loading) {
      fetchList(queryParams)
    }
  }, [loading])

  const fetchList = async(params) => {
    setLoading(true)
    const response = await api(params);
    setData(response.data);
    if(!data.lastPage) {
      setList(([...list, ...response.data.list]))
    }
    setLoading(false)
    Taro.stopPullDownRefresh()
  }

  return {
    loading,
    data,
    list,
    fetchList,
    queryParams,
    setQueryParams,
    setLoading
  }
}