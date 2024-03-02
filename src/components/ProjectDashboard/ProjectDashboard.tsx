import {Navigate, useNavigate, useParams} from "react-router-dom";
import {Project} from "../../util/types";
import {useEffect, useState} from "react";
import restClient from "../../util/rest.util";
import styles from "./ProjectDashboard.module.css";
import DashboardNavbar from "../DashboardNavbar/DashboardNavbar";
import ProjectDashboardNavbar from "../ProjectDashboardNavbar/ProjectDashboardNavbar";
import ProjectSidebar from "../ProjectSidebar/ProjectSidebar";
import ProjectTabs from "../ProjectTabs/ProjectTabs";

export default function ProjectDashboard() {
    const navigate = useNavigate();
    const {projectId} = useParams();

    const [project, setProject] = useState<Project | null>(null);

    useEffect(() => {
        restClient.get(`/projects/${projectId}`)
            .then((response) => {
                // if (!response.success) {
                //     alert("Unable to load this project");
                //     navigate("/projects");
                //     return
                // }
                //
                // setProject(response.data);
            });

    }, [projectId])

    if (!projectId)
        return <Navigate to='/projects'/>

    return (
        <div className={styles.project_dashboard_page}>
            <ProjectDashboardNavbar/>
            <div className={styles.project_dashboard_body}>
                <ProjectSidebar/>
                <ProjectTabs/>
            </div>
        </div>
    );
}