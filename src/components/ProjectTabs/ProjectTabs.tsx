import styles from "./ProjectTabs.module.css";
import {useState} from "react";
import KanbanTab from "../KanbanTab/KanbanTab";

type TabName = 'Kanban' | 'Files' | 'Meeting' | 'Project Analysis'

const TABS: { name: TabName, backgroundColor: string, textColor: string }[] = [
    {
        name: "Kanban",
        backgroundColor: "#E3DCEF",
        textColor: "#987CC2",
    },
    {
        name: "Files",
        backgroundColor: "#B39FD2",
        textColor: "#E3DCEF",
    },
    {
        name: "Meeting",
        backgroundColor: "#96BBF2",
        textColor: "#4454DF",
    },
    {
        name: "Project Analysis",
        backgroundColor: "#BCE2B9",
        textColor: "#658652",
    },

]

export default function ProjectTabs() {
    const [selectedTab, setSelectedTab] = useState<TabName>('Kanban');

    return (
        <div className={styles.project_tabs_container}>
            <div className={styles.project_tabs_pill_container}>
                {TABS.map((tab) =>
                    <div
                        key={`tab_pill_${tab}`}
                        style={{
                            backgroundColor: tab.backgroundColor,
                            color: tab.textColor,
                        }}
                        onClick={() => setSelectedTab(tab.name)}
                    >
                        {tab.name}
                    </div>
                )}
            </div>
            <div className={styles.tab_content_container} style={{
                backgroundColor: TABS.filter((tab) => tab.name === selectedTab)[0].backgroundColor
            }}>
                <div className={styles.tab_content_wrapper}>
                    <KanbanTab/>
                </div>
            </div>
        </div>
    )
}