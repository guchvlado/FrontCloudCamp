
import { PropsWithChildren } from 'react';
import styles from './index.module.scss'

interface AvatarProps {
    src?: string;
}

export const Avatar: React.FC<PropsWithChildren<AvatarProps>> = ({children, src}) => {
    return (
        <div className={styles.root}>
            {src ? <img className={styles.img} src={src} /> : null}
            {!src && children ? <div className={styles.name}>{children}</div> : null}
        </div>
    )
}