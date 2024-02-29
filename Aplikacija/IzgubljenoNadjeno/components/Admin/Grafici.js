import styles from "../../styles/admin.module.css";
import Prikaz from "./Prikaz.js";
import EventCountsChart from "./EventCountsChart.js";


export default function Grafici(){
    return (
        <div className={styles.grafikoni}>
            <EventCountsChart />
            <Prikaz />
        </div>
    );
}