import styles from "./ProjectSidebar.module.css"
import {Message, Project, User} from "../../util/types";
import {useEffect, useMemo, useState} from "react";
import {io} from "socket.io-client";
import {Navigate, useParams} from "react-router-dom";
import restClient from "../../util/rest.util";

type Props = {
    project: Project;
}

export default function ProjectSidebar() {
    const {projectId} = useParams();

    const socket = useMemo(() => {
        return io(process.env.REACT_APP_BACKEND_URL!)
    }, []);

    const [messageContent, setMessageContent] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        restClient.get(`/projects/${projectId}/messages`)
            .then((response) => {
                if (!response.success)
                    return
                setMessages(response.data);
            });

        socket.emit("join_room", {
            projectId: projectId
        });

        socket.on("receive_msg", (message) => {
            setMessages((_messages) => [..._messages, message]);
        });

    }, [projectId]);

    const cachedUser = localStorage.getItem("user")!;
    const user: User = JSON.parse(cachedUser);

    const sendMessage = async (event: React.FormEvent) => {
        event.preventDefault();
        const content = messageContent.trim();
        if (!content)
            return
        const messageData = {
            user: {
                id: user.id,
                name: user.name
            },
            content: content,
            projectId: projectId
        }
        socket.emit("send_msg", messageData);
        setMessageContent('')
    }

    return (
        <div className={styles.sidebar_container}>
            {messages.map((message, index) =>
                <div key={`message_id_${index}`}>
                    <p>{message.user.name}:</p>
                    <pre>{message.content}</pre>
                </div>
            )}
        </div>
    )
}