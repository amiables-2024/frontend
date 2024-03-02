import {ReactNode} from "react";
import styles from "./Modal.module.css";

type Props = {
    children: ReactNode;
    closeModal: () => void;
}
export default function Modal({children, closeModal}: Props){
    return (
        <div className={styles.modal_container}>
            <p className={styles.modal_close} onClick={closeModal}>X</p>
            <div className={styles.modal_wrapper}>
                {children}
            </div>
        </div>
    )
}