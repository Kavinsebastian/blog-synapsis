import React, { FC } from 'react'

type Props = {
  customClassName?: string
  color?: string
  width?: number
  height?: number
}

const ChevronIcon: FC<Props> = ({
  customClassName,
  width = 14,
  height = 15,
  color = 'white',
}) => {
  return (
    <svg className={customClassName} width={width} height={height} viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_261_1421)">
        <path d="M13.3246 4.25977L6.95617 10.6363L0.587752 4.27591" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <defs>
        <clipPath id="clip0_261_1421">
          <rect width="13.8947" height="13.8947" fill='white' transform="matrix(0 1 -0.999999 0.00126788 13.9036 0.49585)" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default ChevronIcon
