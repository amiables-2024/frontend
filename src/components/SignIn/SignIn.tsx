import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";

import styles from './SignIn.module.css';
import logoImg from "../../assets/images/logo_name.svg";
import restClient from "../../util/rest.util";

const SignIn = () => {
    const navigate = useNavigate();

    const [error, setError] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const request = await restClient.post('/auth/login', {
            data: {
                email: email,
                password: password
            }
        });

        if (!request.success) {
            setError(request.data)
            return
        }
        console.log(request);

        localStorage.setItem("accessToken", request.data.token);
        localStorage.setItem("user", JSON.stringify(request.data.user));
        navigate("/dashboard");
    };

    return (
        <div className={styles.sign_in_page}>
            <div className={styles.sign_in_container}>
                <div className={styles.sign_in_box}>
                    <form onSubmit={handleSubmit} className={styles.sign_in_form}>
                        <a href={'/'}>
                            <img src={logoImg} alt={"Sweet"}/>
                        </a>
                        <h2 className={styles.sign_in_header}>Sign in to continue to your personal dashboard</h2>
                        {error && <p className={styles.error}>{error}</p>}
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
                            <a href='/sign-up'>
                                <button type="button">Sign Up</button>
                            </a>
                            <button type="submit">Sign In</button>

                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default SignIn;
