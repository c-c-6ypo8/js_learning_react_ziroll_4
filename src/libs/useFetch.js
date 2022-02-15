import { useState, useEffect, useCallback } from 'react'

export const useFetch = (initialUrl, initialParams = {}, run = true) => {
  const [url, updateUrl] = useState(initialUrl)
  const [params, updateParams] = useState(initialParams)
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [hasLoadingError, setHasError] = useState(false)
  const [loadingErrorMessage, setErrorMessage] = useState('')
  const [refetchIndex, setRefetchIndex] = useState(0)

  const queryString = Object.keys(params)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`,
    )
    .join('&')

  const refetch = useCallback(
    () => setRefetchIndex((prevRefetchIndex) => prevRefetchIndex + 1),
    [],
  )

  useEffect(() => {
    const fetchData = async () => {
      if (!run) return
      setIsLoading(true)
      try {
        const response = await fetch(`${url}?${queryString}`)
        const result = await response.json()
        if (response.ok) {
          setData(result)
        } else {
          setHasError(true)
          setErrorMessage(result)
        }
      } catch (err) {
        setHasError(true)
        setErrorMessage(err.message)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [url, params, refetchIndex, queryString, run])
  return {
    data,
    isLoading,
    hasError: hasLoadingError,
    errorMessage: loadingErrorMessage,
    updateUrl,
    updateParams,
    refetch,
  }
}
