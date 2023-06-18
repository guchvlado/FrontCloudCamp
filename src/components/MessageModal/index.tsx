

import { Button, Modal } from '../../UI'
import cn from 'classnames'
import styles from './index.module.scss'

import SuccessIcon from '../../assets/messageSuccess.svg'
import ErrorIcon from '../../assets/messageError.svg'
import CloseIcon from '../../assets/closeIcon.svg'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { clearForm } from '../../redux/reducers/formSlice'

export interface MessageModalProps {
    opened: boolean;
    onClose: () => void;
    isSuccess?: boolean
    isError?: boolean
  }

export const MessageModal: React.FC<MessageModalProps> = ({onClose, opened, isError, isSuccess}) => {
    if (!isError && !isSuccess) return null;

    return (
        <Modal onClose={onClose} opened={opened} closeOnClickOutside className={styles.modal} >
            {isSuccess ? <SuccessContent/> : isError ? <ErrorContent onClose={onClose}/> : null}
        </Modal>
    )
}

const SuccessContent = () => {
    
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const onClickButton = () => {
        dispatch(clearForm())
        navigate('/')
    }

    return (
        <>
            <div className={styles.text}>Форма успешно отправлена</div>
            <img className={styles.icon} src={SuccessIcon} alt="Success" />
            <Button className={cn(styles.button, styles.success)} id='button-to-main' onClick={onClickButton}>На главную</Button>
        </>
    )
}

const ErrorContent = ({onClose}: {onClose: () => void}) => {
    return (
        <>
            <div className={styles.header}>
                <div className={styles.text}>Ошибка</div>
                <div className={styles.close} onClick={onClose}>
                    <img src={CloseIcon} alt="close" />
                </div>
            </div>
            <img className={styles.icon} src={ErrorIcon} alt="Error" />
            <Button className={cn(styles.button, styles.error)} id='button-close' onClick={onClose}>Закрыть</Button>
        </>
    )
}