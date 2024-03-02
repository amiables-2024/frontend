import styles from "./DashboardNavbar.module.css";
import logoImg from "../../assets/images/logo_name.svg";
import {getAvatarUrl} from "../../util/misc.util";
import {Link, Navigate, useNavigate} from "react-router-dom";
import {User} from "../../util/types";
import {useState} from "react";
import Modal from "../Modal/Modal";
import restClient from "../../util/rest.util";

export default function DashboardNavbar() {

    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState('');
    const [pdfFile, setPdfFile] = useState(null);
    const [dueDate, setDueDate] = useState('');
    const [members, setMembers] = useState<number[]>([]);  // Array of member ids
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    

    const cachedUser = localStorage.getItem("user");
    if (cachedUser == null)
        return <Navigate to='/sign-in'/>;

    const user: User = JSON.parse(cachedUser);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const request = await restClient.post('/projects', {
            data: {
                name: name
            }
        });

        if (!request.success) {
            setError(request.data)
            return
        }

        const projectId = request.data;

        navigate(`/project/${projectId}`);
    }

    return (
        <>
            <div className={styles.navbar}>
                <div>
                    <Link to='/' className={styles.navbar_logo}>
                        <img src={logoImg} alt={'Sweet Logo'}/>
                    </Link>
                </div>
                <div className={styles.navbar_right}>
                    <button
                        className={styles.project_create_btn}
                        onClick={() => setShowModal(true)}
                    >
                        Create New Project
                    </button>
                    <div className={styles.avatar_group}>
                        <p>{user.name}</p>
                        <img src={getAvatarUrl(user.id)} alt={'Avatar'}/>
                    </div>
                </div>
            </div>
            {showModal &&
                <Modal closeModal={() => setShowModal(false)}>
                    <form className={styles.create_box} onSubmit={handleSubmit}>
                        <h1>Create Project</h1>
                        {error && <p className="error">{error}</p>}
                        <div className="form_group">
                            <input
                                placeholder={"Enter a project name"}
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />
                        </div>
                        <div className="form_group">
                            <label htmlFor="dueDate">Due Date:</label>
                            <input
                                type="date"
                                id="dueDate"
                                value={dueDate}
                                onChange={(event) => setDueDate(event.target.value)}
                            />
                        </div>
                        <div className="form_group">
                            {/* Member invitation section */}
                            {/* You can implement this part using debouncing for API calls */}
                        </div>
                        <div className="form_group">
                            <label htmlFor="description">Description:</label>
                            <textarea
                                id="description"
                                className="block w-full h-40 px-4 py-2 border border-gray-300 rounded-md resize-none"
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                            />
                        </div>
                        <div className="form_group">
                            <label htmlFor="pdfFile">Upload PDF:</label>
                            <input
                                type="file"
                                id="pdfFile"
                                accept=".pdf"
                                // onChange={(event) => setPdfFile(event.target.files[0])}
                            />
                        </div>
                        <div>
                            <button className={`${styles.submit_btn} mt-2`} type="submit">Create Project</button>
                        </div>
                    </form>
                </Modal>
            }
        </>
    )
}