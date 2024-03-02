import styles from "./DashboardNavbar.module.css";
import logoImg from "../../assets/images/logo_name.svg";
import {getAvatarUrl} from "../../util/misc.util";
import {Navigate} from "react-router-dom";
import {User} from "../../util/types";

export default function DashboardNavbar() {
    const cachedUser = localStorage.getItem("user");
    if (cachedUser == null)
        return <Navigate to='/sign-in'/>
    const user: User = JSON.parse(cachedUser);

    return (
        <div className={styles.navbar}>
            <div>
                <a className={styles.navbar_logo}>
                    <img src={logoImg} alt={'Sweet Logo'}/>
                </a>
            </div>
            <div className={styles.navbar_right}>
                <button className={styles.project_create_btn}>Create New Project</button>
                <div className={styles.avatar_group}>
                    <p>{user.name}</p>
                    <img src={getAvatarUrl(user.id)} alt={'Avatar'}/>
                </div>
            </div>
        </div>
    )
}