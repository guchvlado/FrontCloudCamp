

import { Avatar } from '../../UI'
import styles from './index.module.scss'

import AvatarImage from '../../assets/avatar.jpg'
import { ContactItem } from '../../components/ContactItem'
import { IContact } from '../../types'



export const HomePage: React.FC = () => {

    const contacts: IContact[] = [
        {id: 1, title: 'Telegram', link: 'https://t.me/guchvlado'},
        {id: 2, title: 'GitHub', link: 'https://github.com/guchvlado'},
        {id: 3, title: 'Resume', link: 'https://github.com/guchvlado'},
    ]

    return (
        <div className={styles.root}>
            <div className={styles.header}>
                <Avatar>АИ</Avatar>
                <div className={styles.info}>
                    <div>Иван Иванов</div>
                    <div className={styles.socials}>
                        {contacts.map(item => <ContactItem key={item.id} {...item} />)}
                    </div>
                </div>
            </div>
        </div>
    )
}