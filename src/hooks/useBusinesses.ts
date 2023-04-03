import { useState, useEffect } from 'react'
import { singletonHook } from 'react-singleton-hook'

const useBusinesses = () => {
  const [allBusinesses, setAllBusinesses] = useState<any | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<any | null>(null)

  useEffect(() => {
    setLoading(true)
    fetch('/api/get-all-businesses', {
      method: 'POST',
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
      })
      .then((data) => {
        setAllBusinesses(data?.allBusinesses?.data)
        setLoading(false)
      })
      .then((e) => {
        setLoading(false)
        setError(e)
      })
  }, [])

  return { allBusinesses, loading, error }
}

// @ts-ignore
export default singletonHook({ loading: true }, useBusinesses)
