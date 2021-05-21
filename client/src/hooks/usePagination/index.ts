import { stopPullDownRefresh } from '@tarojs/taro'
import {useState, useEffect} from 'react'
import { Result } from 'utils/http'
import { Page, PageData, PaginationParam, defPaginationParams, getDefPageData, mergePagination } from './entity'
import produce from 'immer'

type APIFunc<T, P> = (params: P) => Promise<Result<Page<T>>>

export interface FetchResult<T> {
  loading: boolean,
  errMsg: string,
  data: T
}

export default function usePagination<T>(
  api: APIFunc<T, PaginationParam>,
  param: PaginationParam = {},
  delay?: boolean
) {
  const [state, setState] = useState({
    loading: true,
    increasing: false,
    errMsg: '',
    params: { ...defPaginationParams, ...param },
    list: getDefPageData<T>()
  })
  const { loading, increasing, params, list } = state;

  useEffect(() => {
    if (!loading || delay) { return };
    fetchList();
  }, [loading, delay])

  useEffect(() => {
    const { current } = list.pagination;
    increasing && fetchList({ current: current + 1 })
  }, [increasing])

  function fetchList(params: PaginationParam = {}) {
    const _param = params ? setParams(params) : state.params;
    return api(_param).then(res => {
      // 利用高阶函数科里化特性，可以这样操作
      // const producer = produce(draft => {
      //   draft.list = mergePagination(list, res.data);
      //   draft.loading = false
      //   draft.increasing = false
      //   draft.errMsg = ''
      // })
      // setState(producer(state))
      setState(produce(state, (proxy: typeof state) => {
        proxy.list = mergePagination(list, res.data);
        proxy.loading = false
        proxy.increasing = false
        proxy.errMsg = ''
      }))
      stopPullDownRefresh();
    }).catch(e => {
      setState(produce(state, draft => {
        draft.errMsg = e.message
        draft.loading = false
        draft.increasing = false
      }))
      stopPullDownRefresh();
    })
  }

  function setParams(option: PaginationParam = {}, refreshing?: boolean) {
    const _param = refreshing ? { ...params, ...option, ...defPaginationParams } : { ...params, ...option };
    // state.params = _param;
    setState(produce(state, df => {
      df.params = _param
    }))
    if (refreshing) {
      setState(produce(state, df => {
        df.loading = true
      }))
    }
    return _param;
  }

  async function deleteItem(index: number) {
    const { pageSize = 10, current: originCurrent } = list.pagination
    const deletePageNumber = Math.ceil((index + 1) / pageSize)
    if (originCurrent === 1) {
        setState(produce(state, df => {
          df.loading = true
        }))
    } else {
        let i = deletePageNumber
        let updateList: PageData<T> = { pagination: { current: 1 }, list: [] }
        const apiResultList: Promise<Result<Page<T>>>[] = []
        while (i <= originCurrent) {
            apiResultList.push(api({
                ... params,
                current: i,
                pageSize: list.pagination.pageSize,
            }))
            i++
        }
        try {
            const res = await Promise.all(apiResultList)
            const { current = 1, lastPage, total } = res[res.length - 1].data
            let tmpList: T[] = []
            res.forEach( item => tmpList = tmpList.concat(item.data.list) )
            updateList.list = JSON.parse(JSON.stringify(list.list))
            const deleteIndex = (deletePageNumber - 1) * pageSize
            const deleteCount = (originCurrent - deletePageNumber + 1) * pageSize
            updateList.list.splice(deleteIndex, deleteCount, ...tmpList)
            updateList.pagination = {
                current,
                pageSize,
                lastPage,
                total
            }
            setState(produce(state, (draft: typeof state) => {
              draft.list = updateList
            }))
        } catch (error) {
            console.error(error)
        }
    }
  }

  return {
    ...state,
    setLoading: (loading: boolean) => setState(produce(state, df => {
      df.loading = loading
    })),
    setIncreasing: (increasing: boolean) => setState(produce(state, df => {
      df.increasing = increasing
    })),
    deleteItem,
    setParams,
    resetParams: () => {
      setState(produce(state, df => {
        df.params = defPaginationParams
      }))
    },
    // 更新List中的某条数据
    updateList: (params: {item: T, index: number}) => {
      const { item, index } = params
      const nextState = produce(state, (draft: typeof state) => {
        draft.list.list[index] = { ...item }
      })
      setState(nextState)
    },
    // 更新所有List数据
    updateAllList: (list: PageData<T>) => {
      setState(produce(state, (draft: typeof state) => {
        draft.list = list
      }))
    },
    push: (item: T) => {
      setState(produce(state, (draft: typeof state) => {
        draft.list.list.push(item)
        draft.list.pagination.total! += 1
      }))
    },
    unshift: (item: T) => {
      setState(produce(state, (draft: typeof state) => {
        draft.list.list.unshift(item)
        draft.list.pagination.total! += 1
      }))
    },
    pop: () => {
      setState(produce(state, (draft: typeof state) => {
        if (draft.list.list.length > 0) {
          draft.list.list.pop()
          draft.list.pagination.total! -= 1
        }
      }))
    },
    shift: () => {
      setState(produce(state, (draft: typeof state) => {
        if (draft.list.list.length > 0) {
          draft.list.list.shift()
          draft.list.pagination.total! -= 1
        }
      }))
    },
    splice: (start: number, number: number) => {
      setState(produce(state, (draft: typeof state) => {
        if (draft.list.list.length > 0) {
          draft.list.list.splice(start, number)
          draft.list.pagination.total! -= number
        }
      }))
    }
  }
}
