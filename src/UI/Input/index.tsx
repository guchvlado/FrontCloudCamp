import { ChangeEvent, InputHTMLAttributes, PropsWithChildren, useRef, forwardRef, DetailedHTMLProps } from "react";
import cn from "classnames";
import {IMaskInput} from 'react-imask'
import styles from './index.module.scss'

interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    variant?: 'filled' | 'outline';
    label?: string;
    error?: string;
}

interface InputPropsMasked extends InputProps {
    mask: string;
}


export const Input = forwardRef(({ className, id, label, variant = 'outline', error, ...props}: InputProps, forwardRef) => {
    const inputClass = cn(styles.input, styles[variant], className);
    const rootClass = cn(styles.root, styles[variant]);

    return (
        <div className={rootClass}>
            {label ? <label htmlFor={id} className={styles.label}>{label}</label> : null}
            <input id={id} className={inputClass} {...props}/>
            {error ? <p className={styles.error}>{error}</p> : null}
        </div>
    )
})

export const InputMasked = forwardRef(({ mask, className, id, label, variant = 'outline', error, ...props}: InputPropsMasked, forwardRef) => {
    const inputClass = cn(styles.input, styles[variant], className);
    const rootClass = cn(styles.root, styles[variant]);
    const inputRef = useRef(null)

    return (
        <div className={rootClass}>
            {label ? <label htmlFor={id} className={styles.label}>{label}</label> : null}
            <IMaskInput
                {...props}
                className={inputClass}
                mask={mask}
                ref={null}
                inputRef={inputRef}
                id={id}
            />
            {error ? <p className={styles.error}>{error}</p> : null}
        </div>
    )
})