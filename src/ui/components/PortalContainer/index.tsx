import React, {
  CSSProperties,
  forwardRef,
  ReactNode,
  useEffect,
  useRef,
  useState
} from 'react';
import ReactDOM from 'react-dom';
import { usePopper } from 'react-popper';
import type { Options } from '@popperjs/core';

declare interface PortalContainerProps {
  children: ReactNode;
  style: CSSProperties;
  isShow: boolean;
  isHasBackdrop?: boolean;
  disablePointerEvents?: boolean;
  container?: React.ReactNode | HTMLElement;
  onClickBackdrop?: () => void;
  customBackdropStyle?: string;
}

export const usePortalContainer = (options?: Options) => {
  const [referenceElement, setReferenceElement] = useState<any>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
  const [arrowElement, setArrowElement] = useState<any>(null);

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [{ name: 'arrow', options: { element: arrowElement } }],
    placement: options?.placement ? options?.placement : 'bottom-start'
  });

  return {
    referenceElement,
    setReferenceElement,
    setPopperElement,
    setArrowElement,
    styles,
    attributes
  };
};

const PortalContainer = (
  {
    children,
    isShow,
    container = null,
    isHasBackdrop = false,
    disablePointerEvents = false,
    onClickBackdrop = () => { },
    customBackdropStyle,
    ...props
  }: PortalContainerProps,
  ref: React.LegacyRef<HTMLDivElement>
) => {
  const containerRef = useRef<HTMLElement | null>(null);
  const backdropRef = useRef<HTMLElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    containerRef.current = document.querySelector<HTMLElement>('#portal-container');
    backdropRef.current = document.querySelector<HTMLElement>('#portal-backdrop');
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isShow ? 'hidden' : 'inherit';
  }, [isShow]);

  useEffect(() => {
    const isHTMLElement = container instanceof HTMLElement;
    if (isHTMLElement && isShow) {
      container.style.overflowY = 'hidden';
    } else if (isHTMLElement) {
      container.style.overflowY = 'inherit';
    }
  }, [container, isShow]);

  if (mounted && containerRef.current && isShow) {
    return (
      <>
        {ReactDOM.createPortal(
          <div ref={ref} {...props}>
            {children}
          </div>,
          container instanceof HTMLElement ? container : containerRef.current
        )}

        {isHasBackdrop ?
          ReactDOM.createPortal(
            <div onClick={onClickBackdrop} className={`${customBackdropStyle ?? 'bg-black opacity-[0.2]'} h-screen w-screen fixed top-0 z-[24] ${disablePointerEvents ? 'pointer-events-none' : ''}`} />,
            backdropRef.current as HTMLElement
          ) :
          null}
      </>
    );
  }

  return null;
};

export default forwardRef<HTMLDivElement, PortalContainerProps>(PortalContainer);