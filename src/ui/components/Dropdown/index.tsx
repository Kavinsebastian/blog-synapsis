import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { DropdownOption } from '@/infrastructure/types'
import cx from 'classnames'
import ChevronIcon from '@/ui/assets/images/svg/ChevronIcon';

interface DropdownProps {
  options: DropdownOption[];
  label?: string
  isRequired?: boolean
  useLabel?: boolean
  value?: DropdownOption | null
  isError?: boolean
  errorMessage?: string
  placeholder?: string
}

interface DropdownActions {
  onChange: (value: DropdownOption) => void;
}

const Dropdown: React.FC<DropdownProps & DropdownActions> = ({
  options,
  label,
  isRequired,
  useLabel,
  value,
  onChange,
  placeholder = 'Pilih',
  ...rest
}) => {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [openOption, setOpenOption] = useState<boolean>(false)

  const selectedValue = useMemo(() => {
    return selectedOption
  }, [selectedOption])

  const handleOptionChange = useCallback((option: DropdownOption) => () => {
    setSelectedOption(option.label);
    onChange(option);
    setOpenOption(false)
  }, [onChange]);

  const onBlur = useCallback((event: unknown) => {
    if (!(event as MouseEvent).relatedTarget) {
      setOpenOption(false)
    }
  }, [])

  useEffect(() => {
    if (value) {
      setSelectedOption(value.label)
    }
  }, [value])

  return (
    <div className="relative inline-block text-left w-full">
      {
        useLabel && (
          <div className="flex gap-0.5 font-bold">
            <p className='text-black-base'>{label}</p>
            {isRequired && <p className='text-red-500'>*</p>}
          </div>
        )
      }
      <div
        tabIndex={0}
        className={cx(
          'flex justify-between ring-1 ring-inset items-center w-full gap-x-1.5 rounded-md bg-white px-4 py-2 font-semibold text-gray-900 shadow-sm  hover:bg-gray-50 cursor-pointer',
          rest.isError ? 'ring-red-600' : ' ring-gray01'
        )}
        onClick={() => setOpenOption(!openOption)}
        onKeyDown={(event) => { if (event.code === 'Enter') setOpenOption(!openOption) }}
        onBlur={onBlur}
      >
        <p className={cx('!font-medium text-black-base text-sm', selectedValue ? '' : 'text-slate-400')}>
          {selectedValue ? selectedValue : placeholder}
        </p>
        <ChevronIcon color='#999' customClassName={`transition-all duration-600 ${openOption ? '-rotate-90' : ''}`} />
      </div>

      {
        openOption &&
        <div className="absolute  right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div>
            {
              options.map((option, index) => {
                return (
                  <div key={`${option.value}-${index}`} tabIndex={0} className="cursor-pointer px-3 py-2 hover:bg-gray-50" onClick={handleOptionChange(option)}>
                    <span className='!text-black01 !font-medium'>{option.label}</span>
                  </div>
                )
              })
            }
          </div>
        </div>
      }
      {
        rest.isError &&
        <div className="text-start absolute top-16 text-xs">
          <span className='!text-red-600'>{rest.errorMessage}</span>
        </div>
      }
    </div>
  );
};

export default Dropdown;
