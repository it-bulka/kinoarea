import { useEffect, useState } from 'react'

export const useBgImage = (src?: string) => {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!src) return

    setLoaded(false)

    const img = new Image()

    img.onload = () => setLoaded(true)
    img.onerror = () => setLoaded(false)

    img.src = src

    return () => {
      img.onload = null
      img.onerror = null
    }
  }, [src])

  return loaded
}
