import React, { FC } from 'react';
import PortalContainer, { usePortalContainer } from '@/ui/components/PortalContainer';
import styles from './styles.module.css'

declare interface Props {
  show: boolean
}

const LoadingOverlay: FC<Props> = ({ show }) => {
  const { setPopperElement, attributes, styles: stylesPopper } = usePortalContainer();

  return (
    <PortalContainer
      ref={setPopperElement}
      style={{
        ...stylesPopper.popper,
        zIndex: 30,
        width: '100%'
      }}
      isShow={show}
      isHasBackdrop
      {...attributes.popper}
    >
      <div className="flex justify-center items-center min-h-screen">
        <div className={styles['spinner-container']}>
          <div className={styles['spinner']}>
            <div className={styles['spinner']}>
              <div className={styles['spinner']}>
                <div className={styles['spinner']}>
                  <div className={styles['spinner']}>
                    <div className={styles['spinner']}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <span className="sr-only">Loading...</span>

      </div>

    </PortalContainer>
  );
};

export default LoadingOverlay;
