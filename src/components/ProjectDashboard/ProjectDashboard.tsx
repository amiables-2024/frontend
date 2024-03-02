import {Navigate, useNavigate, useParams} from "react-router-dom";
import {Project} from "../../util/types";
import {useEffect, useState} from "react";
import restClient from "../../util/rest.util";

export default function ProjectDashboard() {
    const navigate = useNavigate();
    const {projectId} = useParams();

    const [project, setProject] = useState<Project | null>(null);
    if (!projectId)
        return <Navigate to='/projects'/>

    useEffect(() => {
        restClient.get(`/projects/${projectId}`)
            .then((response) => {
                if (!response.success) {
                    alert("Unable to load this project");
                    navigate("/projects");
                    return
                }

                setProject(response.data);
            });

    }, [projectId])

    return (
        <div>

        </div>
    );
}