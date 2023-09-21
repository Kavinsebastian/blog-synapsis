interface Props {
  onClick?: (label: string, id?: number) => void
}
const useHooks = ({ onClick }: Props) => {
  const handleClick = (label: string, id?: number, useAction: boolean = false) => {
    if (useAction && onClick) {
      onClick(label, id)
    }
  }
  return {
    state: {},
    methods: { handleClick }
  }
}

export default useHooks
