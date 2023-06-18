import { DetailedHTMLProps, SelectHTMLAttributes, forwardRef } from "react";
import cn from "classnames";

import styles from "./index.module.scss";

import ArrowDown from "../../assets/ArrowDown.svg";

interface IData {
  value: string;
  label: string;
  id?: string;
}

interface SelectProps
  extends DetailedHTMLProps<
    SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  label?: string;
  error?: string;
  data: IData[];
}

export const Select = forwardRef(
  (
    { className, id, placeholder, label, error, data, ...props }: SelectProps,
    forwardRef
  ) => {
    const selectClass = cn(styles.select, className);

    return (
      <div className={styles.root}>
        {label ? (
          <label htmlFor={id} className={styles.label}>
            {label}
          </label>
        ) : null}
        <div className={styles.container}>
          <select id={id} className={selectClass} {...props}>
            <option value={placeholder} disabled hidden>
              {placeholder}
            </option>
            {data.map((item, index) => (
              <option
                className={styles.option}
                key={index}
                id={item.id}
                value={item.value}
              >
                {item.label}
              </option>
            ))}
          </select>
          <img src={ArrowDown} className={styles.arrow} />
        </div>
        {error ? <p className={styles.error}>{error}</p> : null}
      </div>
    );
  }
);
