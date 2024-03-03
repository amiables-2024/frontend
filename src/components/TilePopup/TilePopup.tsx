import React, {useState} from 'react';
import {Todo} from '../../util/types';
import restClient from "../../util/rest.util";
import {toast} from "react-toastify";
import {useParams} from "react-router-dom";

{/* when you click the ticket in the kanban, it expands and fills the page with fields. uses kanbanitem for thsi*/
}

type Props = {
    todo: Todo;
    onClose: () => void;
};

const TilePopup = ({todo, onClose}: Props) => {
    const {projectId} = useParams();

    const [desc, setDesc] = useState<string>(todo.description);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const request = await restClient.patch(`/projects/${projectId}/todos/${todo.id}`, {
            data: {
                description: desc
            }
        });


        if (!request.success) {
            toast.error("Unable to update your todo status");
            return
        }

        todo.description = desc;
        toast.success("Successfully updated your todo");
        onClose();
    }

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
            <form className="bg-white p-8 rounded-lg shadow-lg" style={{width: '996px', height: '700px'}} onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold mb-4">{todo.title}</h2>
                <h3 className="text-lg font-semibold mb-2">Description:</h3>
                <textarea
                    className="block w-full h-40 px-4 py-2 border border-gray-300 rounded-md resize-none mb-4"
                    value={desc}
                    onChange={(event) => setDesc(event.target.value)}
                />
                {todo.assignee && (
                    <p className="text-sm text-gray-700 mb-4">Assignee: {todo.assignee.name}</p>
                )}
                <p className="text-sm text-gray-700 mb-4">
                    Priority: <span className="font-semibold">{todo.priority}</span>
                </p>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    type="submit"
                >
                    Save
                </button>
            </form>
        </div>
    );
};

export default TilePopup;