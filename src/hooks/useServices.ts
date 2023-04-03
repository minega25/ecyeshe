import { useState, useEffect } from 'react'
import { singletonHook } from 'react-singleton-hook'

const useServices = () => {
  const [allServices, setAllServices] = useState()
  const [loading, setLoading] = useState<boolean>()
  const [error, setError] = useState<any>()

  useEffect(() => {
    setLoading(true)
    fetch('/api/get-all-services', {
      method: 'POST',
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
      })
      .then((data) => {
        setAllServices(data?.allServices?.data)
        setLoading(false)
      })
      .then((e) => {
        setLoading(false)
        setError(e)
      })
  }, [])

  return { allServices, loading, error }
}

// @ts-ignore
export default singletonHook({ loading: true }, useServices)
