import {Navigate, useNavigate, useParams} from "react-router-dom";
import {Project} from "../../util/types";
import {useEffect, useState} from "react";
import restClient from "../../util/rest.util";
import styles from "./ProjectDashboard.module.css";
import ProjectDashboardNavbar from "../ProjectDashboardNavbar/ProjectDashboardNavbar";
import ProjectSidebar from "../ProjectSidebar/ProjectSidebar";
import ProjectTabs from "../ProjectTabs/ProjectTabs";
import {ToastContainer} from "react-toastify";

export default function ProjectDashboard() {
    const navigate = useNavigate();
    const {projectId} = useParams();

    const [project, setProject] = useState<Project | null>(null);

    useEffect(() => {
        restClient.get(`/projects/${projectId}`)
            .then((response) => {
                if (!response.success) {
                    alert("Unable to load that project");
                    navigate("/dashboard");
                    return
                }
                setProject(response.data);
            });

    }, [projectId])

    if (!projectId)
        return <Navigate to='/projects'/>

    return (
        <>
            <div className={styles.project_dashboard_page}>
                {project ?
                    <>
                        <ProjectDashboardNavbar project={project}/>
                        <div className={styles.project_dashboard_body}>
                            <ProjectSidebar/>
                            <ProjectTabs project={project}/>
                        </div>
                    </>

                    :
                    <h1>Loading Project</h1>
                }

                <ToastContainer
                    position="bottom-right"
                    autoClose={5000}
                    theme={"dark"}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick={false}
                    rtl={false}
                    pauseOnFocusLoss={false}
                    draggable
                    pauseOnHover
                />
            </div>
        </>

    );
}