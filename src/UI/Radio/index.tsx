import { InputHTMLAttributes, forwardRef, DetailedHTMLProps } from "react";
import cn from "classnames";
import styles from './index.module.scss'

interface RadioProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    label?: string;
}

export const Radio = forwardRef(({ className, id, label, ...props}: RadioProps, forwardRef) => {
    const radioClass = cn(styles.radio, className);

    return (
        <div className={styles.root}>
            <input type="radio" id={id} className={radioClass} {...props}/>
            {label ? <label htmlFor={id} className={styles.label}>{label}</label> : null}
        </div>
    )
})