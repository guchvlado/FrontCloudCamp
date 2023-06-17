

import { DetailedHTMLProps, InputHTMLAttributes, forwardRef } from 'react';
import styles from './index.module.scss'
import { CheckIcon } from './CheckboxIcon';

interface CheckboxProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    label?: string;
}

export const Checkbox = forwardRef(({label, id, ...props}: CheckboxProps, forwardRef) => {
    return (
        <div className={styles.root}>
            <div className={styles.container}>
                <CheckIcon className={styles.icon} />
                <input className={styles.checkbox} id={id} type="checkbox" {...props}/>
            </div>
            {label && <label className={styles.label} htmlFor={id}>{label}</label>}
        </div>
    )
})

