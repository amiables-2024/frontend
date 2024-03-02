import styles from "./ProjectDashboardNavbar.module.css";
import logoImg from "../../assets/images/logo_name.svg";
import {getAvatarUrl} from "../../util/misc.util";
import {Link, Navigate, useNavigate} from "react-router-dom";
import {Project, User} from "../../util/types";
import {useState} from "react";
import Modal from "../Modal/Modal";
import restClient from "../../util/rest.util";

type Props = {
    project?: Project;
}

export default function ProjectDashboardNavbar({project}: Props) {
    const navigate = useNavigate();

    const cachedUser = localStorage.getItem("user");
    if (cachedUser == null)
        return <Navigate to='/sign-in'/>;

    const user: User = JSON.parse(cachedUser);

    return (
        <>
            <div className={styles.navbar}>
                <div className={styles.navbar_logo}>
                    <Link to='/'>
                        <img src={logoImg} alt={'Sweet Logo'}/>
                    </Link>
                </div>
                <div className={styles.navbar_right}>
                    <div className={styles.project_info}>
                        <h1>Project Name</h1>
                        <p>Days till due: 1</p>
                    </div>
                    <div className={styles.avatar_group}>
                        <p>{user.name}</p>
                        <img src={getAvatarUrl(user.id)} alt={'Avatar'}/>
                    </div>
                </div>
            </div>
        </>
    )
}