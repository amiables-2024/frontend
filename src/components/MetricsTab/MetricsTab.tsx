import React from "react";
import behind_schedule from "../../assets/images/behind_schedule.png"
import fresh_start from "../../assets/images/fresh_start.png"
import styles from "./MetricsTab.module.css";

const BEHIND_NAME = "Unihack";

const MetricsTab = (props) => {
  return (
    <div className={styles.metrics_tab}>
      <img src={props.project.name == BEHIND_NAME ? behind_schedule : fresh_start} alt="Progress"/>
    </div>
  );
}

export default MetricsTab;