import { IContact } from "../../types";

import styles from "./index.module.scss";

import folderImage from "../../assets/folder.svg";

export const ContactItem: React.FC<IContact> = ({ link, title }) => {
  return (
    <div className={styles.root}>
      <img src={folderImage} alt="folder" />
      <a href={link} className={styles.link}>
        {title}
      </a>
    </div>
  );
};
