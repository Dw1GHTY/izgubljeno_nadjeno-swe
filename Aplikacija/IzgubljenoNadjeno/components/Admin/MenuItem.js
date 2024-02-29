import styles from "../../styles/admin.module.css";

export default function MenuItem({ text, Icon }) {
    return (
        <div className={styles.MenuItem}>
            <Icon className={styles.Icon} />
            <label className={styles.nestani + " " + styles.MenuItemLabel}><span>{text}</span></label>
        </div>
    )
}
