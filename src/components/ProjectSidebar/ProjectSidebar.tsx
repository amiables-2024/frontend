import styles from "./ProjectSidebar.module.css"
import {Message, Project, User} from "../../util/types";
import {useEffect, useMemo, useState} from "react";
import {io} from "socket.io-client";
import {useParams} from "react-router-dom";
import restClient from "../../util/rest.util";
import {getAvatarUrl} from "../../util/misc.util";

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
            <div className={styles.sidebar_messages_container}>
                {messages.map((message, index) =>
                    <div
                        key={`message_id_${index}`}
                        className={`${styles.chat_message}`}
                        style={message.user.id === user.id ?
                            {
                                alignSelf: "flex-end",
                                backgroundColor: "#747474"
                        } :
                            {
                                alignSelf: "flex-start",
                                backgroundColor: "#987CC2"
                            }}
                    >
                        <div className={styles.chat_avatar_group}>
                            <img src={getAvatarUrl(message.user.id)} alt={`${user.name}'s Avatar`}/>
                            <h1>{message.user.name}</h1>
                        </div>
                        <pre>{message.content}</pre>
                    </div>
                )}
            </div>
            <form className={styles.sidebar_input_container} onSubmit={sendMessage}>
                <div className="form_group">
                    <input
                        placeholder={"Send message"}
                        value={messageContent}
                        onChange={(event) => setMessageContent(event.target.value)}
                    />
                </div>
                <input type="submit" style={{visibility: "hidden", position: "absolute"}}/>
            </form>
        </div>
    )
}