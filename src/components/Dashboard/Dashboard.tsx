import styles from "./Dashboard.module.css";
import DashboardNavbar from "../DashboardNavbar/DashboardNavbar";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {Project} from "../../util/types";
import restClient from "../../util/rest.util";

export default function Dashboard() {

    const [projects, setProjects] = useState<Project[]>([])

    useEffect(() => {
        restClient.get('/projects')
            .then((response) => {
                if (!response.success) {
                    alert("Unable to fetch projects. Please try again.")
                    return
                }
                setProjects(response.data);
            })
    }, [])

    return (
        <div className={styles.dashboard_page}>
            <DashboardNavbar/>
            <div className={styles.dashboard_content}>
                <h1 className={styles.dashboard_header}>Projects</h1>
                <hr className={styles.dashboard_line}/>
                <div className={styles.dashboard_projects}>
                    <a className={styles.dashboard_project_box}>
                        <h1>UniHack Project</h1>
                        <p>Progression: 70%</p>
                    </a>
                    <a className={styles.dashboard_project_box}>
                        <h1>COMP30024 A1</h1>
                        <p>Progression: 53%</p>
                    </a>
                    <a className={styles.dashboard_project_box}>
                        <h1>COMP30024 A1</h1>
                        <p>Progression: 53%</p>
                    </a>
                    <Link to='/project/A1' className={styles.dashboard_project_box}>
                        <h1>COMP30024 A1</h1>
                        <p>Progression: 53%</p>
                    </Link>
                    <a className={styles.dashboard_project_box}>
                        <h1>COMP30024 A1</h1>
                        <p>Progression: 53%</p>
                    </a>
                    {projects.map((project) =>
                        <Link
                            className={styles.dashboard_project_box}
                            key={project.id}
                            to={`/project/${project.id}`}
                        >
                            <h1>{project.name}</h1>
                            <p>Progression: {project.progression}%</p>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}