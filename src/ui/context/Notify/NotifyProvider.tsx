import React, { FC, createContext, useEffect, useMemo, useRef, useState } from 'react'
import Notify from '@/ui/components/Notify'
import { createPortal } from 'react-dom'

interface NotifyState {
  message: string
  type: 'success' | 'error'
}

interface Props {
  children: React.ReactNode
}

interface NotifyContextProps {
  open: ({ message, type }: NotifyState) => void
}

// CONTEXT
export const NotifyContext = createContext<NotifyContextProps | null>(null)

const NotifyProvider: FC<Props> = ({ children }) => {
  const [notify, setNotify] = useState<NotifyState | null>(null)
  const [mounted, setMounted] = useState<boolean>(false)

  const ref = useRef<Element | null>(null)

  const open = ({ message, type }: NotifyState) => {
    setNotify({ message, type })
  }

  const close = () => {
    setNotify(null)
  }

  const contextValue = useMemo(() => ({ open }), [])

  useEffect(() => {
    ref.current = document.querySelector<HTMLElement>('body')
    setMounted(true)
  }, [])

  return (
    <NotifyContext.Provider value={contextValue}>
      {children}

      {notify && mounted && createPortal(
        <Notify
          close={() => close()}
          message={notify.message}
          type={notify.type}
          key={'notify'}
        />
        , document.body
      )}
    </NotifyContext.Provider>
  )
}

export default NotifyProvider
