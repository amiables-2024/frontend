import React, {useState} from 'react';
import styles from './SignIn.module.css';
import axios, {AxiosError} from 'axios';
import logoImg from "../../assets/images/logo_name.svg";

const SignIn = () => {
    const [error, setError] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/login`);
            console.log('SignIn Success:', response.data);
            // TODO: Handle success, set session token and redirect to personal dashboard page
            sessionStorage.setItem("accessToken", response.data.token);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('SignIn Error:', error.response?.data);
                // TODO: Handle error, display some error message detailing user not found
            } else {
                // Handle non-Axios errors
                console.error('SignIn Error:', error);
            }
        }
    };

    return (
        <div className={styles.sign_in_page}>
            <div className={styles.sign_in_container}>
                <div className={styles.sign_in_box}>
                    <form onSubmit={handleSubmit} className={styles.sign_in_form}>
                        <div>
                            <img src={logoImg} alt={"Sweet"}/>
                        </div>
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
