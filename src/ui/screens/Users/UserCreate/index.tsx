import { FC } from "react"
import LoadingOverlay from "@/ui/components/LoadingOverlay"
import TextInput from "@/ui/components/TextInput"
import Dropdown from "@/ui/components/Dropdown"
import Button from "@/ui/components/Button"
import { GENDER_OPTIONS, STATUS_OPTIONS } from "@/infrastructure/constants"
import useHooks from "./hooks"

const UserCreate: FC = () => {
  const { state, methods } = useHooks()

  return (
    <div className='max-w-md mx-auto flex flex-col gap-3'>
      <LoadingOverlay show={state.isLoading} />
      <div className='p-4 grid grid-cols-6 text-black-base gap-y-4'>
        <p>Name </p>
        <p>:</p>
        <div className="col-span-4">
          <TextInput
            value={state.name}
            placeholder='Masukan Nama'
            onChange={methods.handleChange('name')}
            useButton={false}
            useIconSearch={false}
            type='text'
            customClass='py-2 px-4 !text-black-base !font-medium'
          />
        </div>

        <p>Email </p>
        <p>: </p>
        <div className="col-span-4">
          <TextInput
            value={state.email}
            placeholder='Masukan Email'
            onChange={methods.handleChange('email')}
            useButton={false}
            useIconSearch={false}
            type='text'
            customClass='py-2 px-4 !text-black-base !font-medium'
          />
        </div>

        <p>Gender </p>
        <p>: </p>
        <div className="col-span-4">
          <Dropdown
            options={GENDER_OPTIONS}
            value={state.gender}
            onChange={methods.handleChange('gender')}
          />
        </div>

        <p>Status </p>
        <p>: </p>
        <div className="col-span-4">
          <Dropdown
            options={STATUS_OPTIONS}
            value={state.status}
            onChange={methods.handleChange('status')}
          />
        </div>
      </div>
      <Button
        onClick={methods.handleClick}
        type={state.isDisableSubmit ? 'disabled' : 'primary'}
        variant='medium'
        customClassName='w-full'
        isDisabled={state.isDisableSubmit}
      >
        Submit
      </Button>
    </div>
  )
}

export default UserCreate
