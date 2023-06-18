import { Portal } from "../Portal";
import { PropsWithChildren, useRef } from "react";
import styles from "./index.module.scss";
import cn from "classnames";

export interface ModalProps {
  className?: string;
  opened: boolean;
  onClose: () => void;
  closeOnClickOutside?: boolean;
}

export const Modal: React.FC<PropsWithChildren<ModalProps>> = ({
  children,
  className,
  opened,
  onClose,
  closeOnClickOutside,
}) => {
  const modalClass = cn(styles.modal, className);

  const modalRef = useRef<HTMLDivElement>(null);

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === modalRef.current && closeOnClickOutside) {
      onClose();
    }
  };

  if (!opened) {
    return null;
  }

  return (
    <Portal>
      <div
        className={styles.overlay}
        onClick={handleOverlayClick}
        ref={modalRef}
      >
        <div className={modalClass}>{children}</div>
      </div>
    </Portal>
  );
};
