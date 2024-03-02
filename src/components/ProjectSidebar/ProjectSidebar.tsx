import styles from "./ProjectSidebar.module.css"
import {Project} from "../../util/types";

type Props = {
    project: Project;
}

export default function ProjectSidebar() {
    return (
        <div className={styles.sidebar_container}>

        </div>
    )
}