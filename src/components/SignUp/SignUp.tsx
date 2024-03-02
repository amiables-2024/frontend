import React, {useState} from 'react';
import { redirect } from "react-router-dom";

import styles from './SignUp.module.css';
import logoImg from "../../assets/images/logo_name.svg";
import restClient from "../../util/rest.util";

export default function SignUp() {
    const [error, setError] = useState('')
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const request = await restClient.post('/auth/register', {
            data: {
                name: name,
                email: email,
                password: password
            }
        });

        if (!request.success) {
            setError(request.data)
            return
        }

        localStorage.setItem("accessToken", request.data);
        redirect("/dashboard");
    };

    return (
        <div className={styles.sign_in_page}>
            <div className={styles.sign_in_container}>
                <div className={styles.sign_up_box}>
                    <form onSubmit={handleSubmit} className={styles.sign_in_form}>
                        <a href={'/'}>
                            <img src={logoImg} alt={"Sweet"}/>
                        </a>
                        <h2 className={styles.sign_up_header}>Let’s get you started with Sweet!</h2>
                        {error && <p className={styles.error}>{error}</p>}
                        <div className={styles.form_group}>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />
                        </div>
                        <div className={styles.form_group}>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        <div className={styles.form_group}>
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>
                        <div className={styles.btn_row}>
                            <a href='/sign-in'>
                                <button type="button">Sign In</button>
                            </a>
                            <button type="submit">Sign Up</button>

                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
}