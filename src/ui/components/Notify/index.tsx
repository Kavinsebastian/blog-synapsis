import cx from 'classnames';
import { FC, useEffect } from 'react';

type Props = {
  message: string,
  type: 'success' | 'error',
  close: () => void,
}

const Notify: FC<Props> = ({ message, type, close }) => {

  useEffect(() => {
    const timer = setTimeout(() => close(), 5000)

    return () => clearTimeout(timer)
  })

  return (
    <div className={
      cx(
        'fixed top-20 left-1/2 -translate-x-1/2',
        'rounded-lg py-4 px-3',
        'text-white font-medium text-center',
        type === 'success' ? 'bg-green-600' : 'bg-red-600',
      )
    }>
      {message}
    </div>
  );
};

export default Notify;
