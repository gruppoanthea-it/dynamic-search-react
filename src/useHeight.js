import { useEffect, useState } from 'react'

export const useHeight = () => {
  const [height, setHeight] = useState(0)
  const [div, setDiv] = useState(null)

  function onRef (div) {
    setDiv(div)
    if (!div) return
    setHeight(window.innerHeight - 97 - 64)
  }

  useEffect(() => {
    function calculateHeight () {
      if (!div) return
      setHeight(window.innerHeight - 97 - 64)
    }

    window.addEventListener('resize', calculateHeight)
    return () => { window.removeEventListener('resize', calculateHeight) }
  }, [div])

  return [height, onRef]
}
