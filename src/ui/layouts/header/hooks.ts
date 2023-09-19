import { useCallback, useState } from "react"

interface States {
  isOpen: boolean
}

const useHooks = () => {
  const [state, setState] = useState<States>({
    isOpen: false
  })

  const handleClick = useCallback(() => {
    setState((prev) => ({ ...prev, isOpen: !state.isOpen }))
  }, [state.isOpen])

  return {
    state,
    methods: {
      handleClick
    }
  }
}

export default useHooks
