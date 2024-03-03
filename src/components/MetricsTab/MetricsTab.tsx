import React from "react";
import {Project} from "../../util/types";
import behind_schedule from "../../assets/images/behind_schedule.png"
import fresh_start from "../../assets/images/fresh_start.png"
const BEHIND_NAME = "Unihack";

const MetricsTab = (props) => {
  return (
    <div>
      <img src={props.project.name == BEHIND_NAME ? behind_schedule : fresh_start} />
    </div>
  );
}

export default MetricsTab;