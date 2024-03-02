import styles from "./ProjectDashboardNavbar.module.css";
import logoImg from "../../assets/images/logo_name.svg";
import {getAvatarUrl} from "../../util/misc.util";
import {Link, Navigate} from "react-router-dom";
import {Project, User} from "../../util/types";
type Props = {
    project: Project;
}

export default function ProjectDashboardNavbar({project}: Props) {

    const cachedUser = localStorage.getItem("user");
    if (cachedUser == null)
        return <Navigate to='/sign-in'/>;

    const user: User = JSON.parse(cachedUser);

    return (
        <>
            <div className={styles.navbar}>
                <div className={styles.navbar_logo}>
                    <Link to='/dashboard'>
                        <img src={logoImg} alt={'Sweet Logo'}/>
                    </Link>
                </div>
                <div className={styles.navbar_right}>
                    <div className={styles.project_info}>
                        <h1>{project.name}</h1>
                        <p>Days till due: 13</p>
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