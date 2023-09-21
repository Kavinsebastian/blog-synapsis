import { DropdownOption } from "@/infrastructure/types"
import { useNotify } from "@/ui/context"
import useUsersStore from "@/ui/stores/user"
import { useRouter } from "next/router"
import { SyntheticEvent, useCallback, useMemo, useState } from "react"

interface States {
  name: string
  email: string
  status: DropdownOption | null
  gender: DropdownOption | null
}

const useHooks = () => {
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
    createUser,
    setLoading
  ] = useUsersStore((state) => [
    state.isLoading,
    state.createUser,
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

    const response = await createUser(payload)
    if (response) {
      router.push(router.asPath.replace('/create', ''))
      notify?.open({ message: "successfully", type: "success" })
      return;
    }
    notify?.open({ message: "Failed to Create", type: "error" })
  }, [
    createUser,
    notify,
    router,
    setLoading,
    state.email,
    state.gender?.value,
    state.name,
    state.status?.value
  ])

  const isDisableSubmit = useMemo(() => {
    return !Object.values(state).every((value) => Boolean(value))
  }, [state])

  return {
    state: {
      ...state,
      isLoading,
      isDisableSubmit
    },
    methods: {
      handleChange,
      handleClick,
      setState
    }
  }
}

export default useHooks
