import {Todo, TodoPriorityEnum} from "../../util/types";
import React, {useState} from 'react';
import Modal from "../Modal/Modal";
import TilePopup from "../TilePopup/TilePopup";

type Props = {
    todo: Todo
}

const KanbanItem = ({todo}: Props) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div>
            <div className="flex flex-col items-center justify-center p-4 w-full" id={todo.id}
                 onClick={() => setShowModal(true)}>
                <div
                    className="bg-white border-2 border-gray-300 rounded-xl flex flex-col content-start p-2 shadow-lg w-full cursor-grab">
                    <div
                        className="bg-#F9F8FC border border-gray-300 m-1 p-2 shadow-2xl rounded-lg md:flex items-center justify-center text-sm text-black font-semibold">
                        {todo.title}
                    </div>
                    {todo.assignee && <div
                        className="bg-#F9F8FC border border-gray-300 m-1 p-2 shadow-2xl rounded-lg flex items-center justify-center text-sm text-black">
                        Assignee: {todo.assignee.name}
                    </div>
                    }
                    <div
                        className="bg-#F9F8FC border border-gray-300 m-1 p-2 shadow-2xl rounded-lg flex items-center justify-center text-sm text-black">
                        <span>Priority:</span>
                        {todo.priority === TodoPriorityEnum.LOW &&
                            <span className="bg-green-300 ml-2 px-2 py-1 rounded-full">{todo.priority}</span>
                        }
                        {todo.priority === TodoPriorityEnum.MEDIUM &&
                            <span className="bg-yellow-300 ml-2 px-2 py-1 rounded-full">{todo.priority}</span>
                        }
                        {todo.priority === TodoPriorityEnum.HIGH &&
                            <span className="bg-red-300 ml-2 px-2 py-1 rounded-full">{todo.priority}</span>
                        }
                    </div>
                </div>
            </div>
            {showModal &&
                <Modal closeModal={() => setShowModal(false)}>
                    <TilePopup todo={todo} onClose={() => {
                        setShowModal(false)
                    }}/>
                </Modal>
            }
        </div>
    );
}

export default KanbanItem;