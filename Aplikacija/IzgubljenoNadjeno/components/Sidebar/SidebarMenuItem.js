import styles from "../../styles/sidebar.module.css";

export default function SidebarMenuItem({ text, Icon }) {
    return (
        <div className={styles.sidebarMenuItem+" "+styles.hoverEffect}>
            <Icon className={styles.sidebarIcon} />
            <label className={styles.nestani + " " + styles.sidebarMenuItemLabel}><span>{text}</span></label>
        </div>
    )
}
