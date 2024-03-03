import styles from "./KanbanTab.module.css";
import KanbanItem from "../KanbanItem/KanbanItem";
import {useEffect, useState} from "react";
import dragula from "react-dragula";
import Modal from "../Modal/Modal";
import restClient from "../../util/rest.util";
import {Project, Todo, TodoStatusEnum} from "../../util/types";
import {toast} from "react-toastify";
import {useParams} from "react-router-dom";

type Props = {
    project: Project;
}

export default function KanbanTab({project}: Props) {
    const {projectId} = useParams();

    const [todos, setTodos] = useState<Todo[]>([])

    const [showModal, setShowModal] = useState(false);
    const [newType, setNewType] = useState<TodoStatusEnum>(TodoStatusEnum.PENDING)

    const [error, setError] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('')

    const updateTodos = () => {
        restClient.get(`/projects/${projectId}/todos`)
            .then((response) => {
                if (!response.success) {
                    return
                }
                setTodos(response.data);
            })
    }

    useEffect(() => {
        updateTodos();
    }, []);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const request = await restClient.post(`/projects/${projectId}/todos`, {
            data: {
                title: title,
                description: description,
                status: newType.toString()
            }
        });

        if (!request.success) {
            setError(request.data)
            return
        }

        updateTodos();
        toast.success("Successfully created your todo");
        setShowModal(false);
        setTitle('');
        setDescription('');
    }

    useEffect(() => {
        dragula([document.getElementById("todoItems")!, document.getElementById("progressItems")!, document.getElementById("doneItems")!])
            .on("drop", async (element, target) => {
                const todoId: string = element.id;
                const targetStatus: string = target.id || "";

                let newStatus: TodoStatusEnum;
                switch (targetStatus) {
                    case "progressItems":
                        newStatus = TodoStatusEnum.IN_PROGRESS;
                        break
                    case "doneItems":
                        newStatus = TodoStatusEnum.DONE;
                        break
                    default:
                        newStatus = TodoStatusEnum.PENDING;
                        break
                }

                const request = await restClient.patch(`/projects/${projectId}/todos/${todoId}`, {
                    data: {
                        status: newStatus.toString()
                    }
                });

                if (!request.success) {
                    toast.error("Unable to update your todo status");
                    return
                }

                toast.success("Successfully updated your todo status");
            })
    }, [])

    return (
        <>
            <div className={styles.kanban_tab}>
                <div className={styles.kanban_column}>
                    <div className={styles.kanban_name}>
                        <h1>To Do</h1>
                        <div onClick={() => {
                            setNewType(TodoStatusEnum.PENDING);
                            setShowModal(true)
                        }}>
                            <p>+</p>
                        </div>
                    </div>
                    <div className={styles.kanban_items} id={"todoItems"}>
                        {todos
                            .filter((todo) => todo.status === TodoStatusEnum.PENDING)
                            .map((todo) =>
                                <KanbanItem
                                    key={todo.id}
                                    todo={todo}
                                />
                            )
                        }
                    </div>
                </div>
                <div className={styles.kanban_column}>
                    <div className={styles.kanban_name}>
                        <h1>In Progress</h1>
                        <div onClick={() => {
                            setNewType(TodoStatusEnum.IN_PROGRESS);
                            setShowModal(true)
                        }}>
                            <p>+</p>
                        </div>
                    </div>
                    <div className={styles.kanban_items} id={"progressItems"}>
                        {todos
                            .filter((todo) => todo.status === TodoStatusEnum.IN_PROGRESS)
                            .map((todo) =>
                                <KanbanItem
                                    key={todo.id}
                                    todo={todo}
                                />
                            )
                        }
                    </div>
                </div>
                <div className={styles.kanban_column}>
                    <div className={styles.kanban_name}>
                        <h1>Done</h1>
                        <div onClick={() => {
                            setNewType(TodoStatusEnum.DONE);
                            setShowModal(true)
                        }}>
                            <p>+</p>
                        </div>
                    </div>
                    <div className={styles.kanban_items} id={"doneItems"}>
                        {todos
                            .filter((todo) => todo.status === TodoStatusEnum.DONE)
                            .map((todo) =>
                                <KanbanItem
                                    key={todo.id}
                                    todo={todo}
                                />
                            )
                        }
                    </div>
                </div>
            </div>
            {showModal &&
                <Modal closeModal={() => setShowModal(false)}>
                    <form className={styles.create_box} onSubmit={handleSubmit}>
                        <h1>Create ToDo</h1>
                        {error && <p className="error">{error}</p>}
                        <div className="form_group">
                            <input
                                placeholder={"Enter the todo title"}
                                value={title}
                                onChange={(event) => setTitle(event.target.value)}
                            />
                            <input
                                placeholder={"Enter the todo description"}
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                            />

                        </div>
                        <div>
                            <button className={styles.submit_btn} type="submit">Create ToDo</button>
                        </div>
                    </form>
                </Modal>
            }
        </>
    );
}