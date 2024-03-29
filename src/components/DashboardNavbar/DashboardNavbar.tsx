import styles from "./DashboardNavbar.module.css";
import logoImg from "../../assets/images/logo_name.svg";
import {getAvatarUrl} from "../../util/misc.util";
import {Link, Navigate, useNavigate} from "react-router-dom";
import {User} from "../../util/types";
import {useState} from "react";
import Modal from "../Modal/Modal";
import restClient, {RequestData} from "../../util/rest.util";
import AsyncSelect from 'react-select/async';

type MemberSearchProps = {
    onChange: (value: any) => void;
}

const MemberSearch = ({onChange}: MemberSearchProps) => {

    const loadOptions = async (inputValue: string) => {
        const request = await restClient.get("/users/search", {
            data: {
                query: inputValue
            }
        });

        if (!request.success) {
            return
        }

        const users: User[] = request.data;

        const options = users.map((user) => ({
            value: user.id,
            label: user.name
        }))
        return (options as any);
    };

    return (
        <AsyncSelect
            isMulti
            cacheOptions
            defaultOptions
            loadOptions={loadOptions}
            onChange={onChange}
        />
    );
}


export default function DashboardNavbar() {

    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState('');
    const [pdfFile, setPdfFile] = useState<File | null>(null);
    const [dueDate, setDueDate] = useState('');
    const [members, setMembers] = useState<{ label: string, value:string }[]>([]);  // Array of member ids
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');


    const cachedUser = localStorage.getItem("user");
    if (cachedUser == null)
        return <Navigate to='/sign-in'/>;

    const user: User = JSON.parse(cachedUser);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const requestConfig: RequestData = Object.create(null);

        const formData = new FormData();

        formData.set('name', name);
        formData.set('members', members.map((member) => member.value).join(";"));

        if (pdfFile) {
            formData.set('spec', pdfFile as Blob);
        }

        requestConfig.data = formData;
        requestConfig.headers = {
            "Content-Type": "multipart/form-data"
        };

        const request = await restClient.post('/projects', requestConfig);

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
                        <h1>Let’s get your project started!</h1>
                        {error && <p className="error">{error}</p>}
                        <div className="form_group">
                            <h2>Project Name:</h2>
                            <input
                                placeholder={"Enter a project name"}
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />
                        </div>
                        <div className="form_group"> {/* move this input box to beside the project name box  */}
                            <label htmlFor="dueDate">Due Date:</label>
                            <input
                                type="date"
                                id="dueDate"
                                value={dueDate}
                                onChange={(event) => setDueDate(event.target.value)}
                            />
                        </div>
                        <div className="form_group">
                            <label htmlFor="memberSearch">Invite members (optional):</label>
                            <MemberSearch onChange={(value) => setMembers(value)}/>
                        </div>
                        <div className="form_group">
                            <label htmlFor="description">Description:</label>
                            <textarea
                                placeholder={"Give Freckle the details of your project."}
                                id="description"
                                className="block w-full h-40 px-4 py-2 border border-gray-300 rounded-md resize-none"
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                            />
                        </div>
                        <div className="form_group">
                            <label htmlFor="pdfFile">File (Optional)</label>
                            <div className={styles.fileDescription}>
                                <input
                                    type="file"
                                    accept=".pdf, .docx, .txt"
                                    onChange={(event) => setPdfFile(event.target.files![0])}
                                />
                                <span className={styles.fileTypes}>.pdf, .docx, .txt</span>
                            </div>
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