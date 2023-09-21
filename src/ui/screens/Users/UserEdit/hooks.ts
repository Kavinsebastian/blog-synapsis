import { UserResponse } from "@/domain/response"
import { DropdownOption } from "@/infrastructure/types"
import { useNotify } from "@/ui/context"
import useUsersStore from "@/ui/stores/user"
import { useRouter } from "next/router"
import { SyntheticEvent, useCallback, useEffect, useState } from "react"

interface States {
  name: string
  email: string
  status: DropdownOption | null
  gender: DropdownOption | null
}

const useHooks = (user: UserResponse) => {
  const router = useRouter()
  const notify = useNotify()
  const [state, setState] = useState<States>({
    name: '',
    email: '',
    status: null,
    gender: null
  })

  const [
    isLoading,
    updateUser,
    setLoading
  ] = useUsersStore((state) => [
    state.isLoading,
    state.updateUser,
    state.setLoading
  ])

  const handleChange = useCallback((key: keyof States) => (value: DropdownOption | SyntheticEvent) => {
    setState((prev) => ({
      ...prev,
      [key]: Object.hasOwn(value, 'target') ?
        (<HTMLInputElement>(<SyntheticEvent>value).target).value :
        (<DropdownOption>value)
    }))
  }, [])

  const handleClick = useCallback(async () => {
    setLoading(true)
    const payload = {
      name: state.name,
      email: state.email,
      status: String(state.status?.value ?? ''),
      gender: String(state.gender?.value ?? ''),
    }

    const response = await updateUser(user.id, payload)

    if (response) {
      router.push(router.asPath.replace('/update', ''))
      notify?.open({ message: "successfully", type: "success" })
      return;
    }
    notify?.open({ message: "Failed to Update", type: "error" })
  }, [
    user.id,
    notify,
    router,
    setLoading,
    state.email,
    state.gender?.value,
    state.name,
    state.status?.value,
    updateUser
  ])

  useEffect(() => {
    if (user) {
      setState((prev) => ({
        ...prev,
        name: user.name,
        email: user.email,
        gender: { label: user.gender.replace(user.gender[0], user.gender[0].toUpperCase()), value: user.gender },
        status: { label: user.status.replace(user.status[0], user.status[0].toUpperCase()), value: user.status }
      }))
    }
  }, [user])

  return {
    state: {
      ...state,
      isLoading
    },
    methods: {
      handleChange,
      handleClick,
      setState
    }
  }
}

export default useHooks
