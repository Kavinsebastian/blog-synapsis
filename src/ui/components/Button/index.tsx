import React from 'react'
import cx from 'classnames'

import styles from './style.module.css'

interface Props {
  children: React.ReactNode,
  type: 'primary' | 'outline-primary' | 'disabled' | 'info' | 'info02',
  variant: 'small' | 'medium',
  customClassName?: string,
  isLoading?: boolean,
  isDisabled?: boolean,
}

interface Actions {
  onClick: () => void
}

const Button = ({ type, variant, children, onClick, ...rest }: Props & Actions) => {
  return (
    <div>
      <button
        disabled={rest.isDisabled}
        className={cx(
          'rounded-lg',
          styles[`type__${type}`],
          styles[`variant__${variant}`],
          rest.customClassName,
        )}
        onClick={onClick}
      >
        {rest.isLoading && (
          <div className={cx('flex justify-center')}>
            Loading...
          </div>
        )}

        {!rest.isLoading && children}
      </button>
    </div>
  )
}

export default Button
