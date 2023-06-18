import { PropsWithChildren, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

export interface PortalProps {
  target?: HTMLElement;
}

export const Portal: React.FC<PropsWithChildren<PortalProps>> = ({
  children,
  target = document.body,
}) => {
  const portalRef = useRef(document.createElement("div"));

  useEffect(() => {
    target?.appendChild(portalRef.current);

    const node = portalRef.current;

    return () => {
      target?.removeChild(node);
    };
  }, []);

  return ReactDOM.createPortal(children, portalRef.current);
};
