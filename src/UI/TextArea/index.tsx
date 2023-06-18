import { forwardRef, DetailedHTMLProps, TextareaHTMLAttributes } from "react";
import cn from "classnames";
import styles from "./index.module.scss";

import { TextAreaResize } from "./TextAreaResize";

interface InputProps
  extends DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  label?: string;
  error?: string;
  counter?: boolean;
}

export const TextArea = forwardRef(
  (
    {
      className,
      id,
      label,
      counter = false,
      error,
      value,
      ...props
    }: InputProps,
    forwardRef
  ) => {
    const textAreaClass = cn(styles.textarea, className);

    return (
      <div className={styles.root}>
        {label ? (
          <label htmlFor={id} className={styles.label}>
            {label}
          </label>
        ) : null}
        <div className={styles.container}>
          <TextAreaResize className={styles.icon} />
          <textarea
            value={value}
            id={id}
            className={textAreaClass}
            {...props}
          />
        </div>
        {counter && (
          <div className={styles.counter}>
            Кол-во символов без пробелов:{" "}
            {value ? value.toString().replace(/ /g, "").length : 0}
          </div>
        )}
        {error ? <p className={styles.error}>{error}</p> : null}
      </div>
    );
  }
);
