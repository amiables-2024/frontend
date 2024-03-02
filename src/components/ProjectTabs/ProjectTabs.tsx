import styles from "./ProjectTabs.module.css";
import {useState} from "react";
import KanbanTab from "../KanbanTab/KanbanTab";
<<<<<<< HEAD
import DriveTab from "../DriveTab/DriveTab";
=======
import {Project} from "../../util/types";
>>>>>>> b7604f5bc03c3489d8e5044f8b39802fa0bd1323

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

type Props = {
    project: Project;
}

export default function ProjectTabs({project}: Props) {
    const [selectedTab, setSelectedTab] = useState<TabName>('Kanban');

    const getActiveTabComponent = () => {
        switch (selectedTab) {
            case "Files":
                return <></>
            case "Meeting":
                return <></>
            case "Project Analysis":
                return <></>
            default:
                return <KanbanTab project={project}/>
        }
    }

    return (
        <div className={styles.project_tabs_container}>
            <div className={styles.project_tabs_pill_container}>
                {TABS.map((tab) =>
                    <div
                        key={`tab_pill_${tab.name}`}
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
<<<<<<< HEAD
                    <DriveTab/>
=======
                    {getActiveTabComponent()}
>>>>>>> b7604f5bc03c3489d8e5044f8b39802fa0bd1323
                </div>
            </div>
        </div>
    )
}