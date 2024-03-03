import styles from "./IndexPage.module.css";
import {Link} from "react-router-dom";
import logoImg from "../../assets/images/logo_name.svg";
import freckleImg from "../../assets/images/freckle.svg";

export default function IndexPage() {
    return (
        <div className={styles.index_page}>
            <div className={styles.index_header}>
                <Link to='/' className={styles.index_logo}>
                    <img src={logoImg} alt={'Sweet Logo'}/>
                </Link>
                <div className={styles.index_links}>
                    <p>Why Sweet?</p>
                    <p>Product Guide</p>
                    <p>FAQ</p>
                </div>
                <div className={styles.index_btns}>
                    <Link to='/sign-in' className={styles.log_in_btn}>Log in</Link>
                    <Link to='/sign-up' className={styles.sign_up_btn}>Sign up</Link>
                </div>

            </div>
            <div className={styles.index_body}>
                <div className={styles.index_text}>
                    <h1>Unwrap your product suite with <span>Sweet.</span></h1>
                    <p>Revolutionising collaboration and productivity in one hub, enhancing teamwork for an unparalleled
                        group project experience with Freckle, your AI teammate.</p>
                </div>
            </div>
            <div className={styles.freckle}>
                <img src={freckleImg} alt={'Freckle'}/>
            </div>
        </div>
    )
}