import { PropsWithChildren } from "react";
import { ButtonHTMLAttributes } from "react";
import cn from "classnames";
import styles from "./index.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "filled" | "outline";
}

export const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
  children,
  variant = "filled",
  className,
  ...props
}) => {
  const btnClass = cn(styles.root, styles[variant], className);

  return (
    <button className={btnClass} {...props}>
      {children}
    </button>
  );
};
