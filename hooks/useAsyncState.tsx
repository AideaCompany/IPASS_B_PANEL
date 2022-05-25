import { useState, useRef, useCallback, useEffect } from 'react'

const useAsyncState = <T,>(initialState: T) => {
  const [state, setState] = useState(initialState)
  const resolveState = useRef<T>(null)
  const isMounted = useRef(false)

  useEffect(() => {
    isMounted.current = true

    return () => {
      isMounted.current = false
    }
  }, [])

  useEffect(() => {
    if (resolveState.current) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      resolveState.current(state)
    }
  }, [state])

  const setAsyncState = useCallback(
    newState =>
      new Promise(resolve => {
        if (isMounted.current) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          resolveState.current = resolve
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          setState(newState as T)
        }
      }),
    []
  )

  return [state, setAsyncState]
}

export default useAsyncState
