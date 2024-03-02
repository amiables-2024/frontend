import styles from "./KanbanTab.module.css";
import KanbanItem from "../KanbanItem/KanbanItem";
import { useEffect } from "react";
import dragula from "react-dragula";
import restClient from "../../util/rest.util";

export default function KanbanTab() {

    useEffect(() => {
        dragula([document.getElementById("todoItems")!, document.getElementById("progressItems")!, document.getElementById("doneItems")!])
            .on("drop", async (element) => {

            })
    }, [])

    return (
        <div className={styles.kanban_tab}>
            <div className={styles.kanban_column}>
                <div className={styles.kanban_name}>
                    To Do
                </div>
                <div className={styles.kanban_items} id={"todoItems"}>

                </div>
            </div>
            <div className={styles.kanban_column}>
                <div className={styles.kanban_name}>
                    In Progress
                </div>
                <div className={styles.kanban_items} id={"progressItems"}>
                    <KanbanItem/>
                    <KanbanItem/>
                    <KanbanItem/>
                    <KanbanItem/>
                    <KanbanItem/>
                    <KanbanItem/>
                    <KanbanItem/>
                </div>
            </div>
            <div className={styles.kanban_column}>
                <div className={styles.kanban_name}>
                    Done
                </div>
                <div className={styles.kanban_items} id={"doneItems"}>

                </div>
            </div>
        </div>
    );
}