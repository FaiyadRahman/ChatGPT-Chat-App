import React from "react";
import { useState, useEffect } from "react";
import { usePostLoginMutation, usePostSignUpMutation } from "@/state/api";

const Login = ({ setUser, setSecret }) => {
    const [isRegister, setIsRegister] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [triggerLogin, resultLogin] = usePostLoginMutation();
    const [triggerSignUp] = usePostSignUpMutation();

    const handleLogin = () => {
        triggerLogin({ username, password });
    };
    const handleRegister = () => {
        triggerSignUp({ username, password });
    };
    const handleDemoLogin = () => {
        setUser("Demo");
        setSecret("Demo1234");
    };

    useEffect(() => {
        if (resultLogin.data?.response) {
            setUser(username);
            setSecret(password);
        }
    }, [resultLogin.data]); // eslint-disable-line

    return (
        <div className="login-page">
            <div className="login-container">
                <h2 className="title">ChatGPT App</h2>
                <p
                    className="register-change"
                    onClick={() => setIsRegister(!isRegister)}
                >
                    {isRegister ? "Already a user?" : "Are you a new user?"}
                </p>

                <div>
                    <input
                        className="login-input"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        className="login-input"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="login-actions">
                    <button type="button" onClick={handleDemoLogin}>
                        Demo User Login
                    </button>
                    {isRegister ? (
                        <button type="button" onClick={handleRegister}>
                            Register
                        </button>
                    ) : (
                        <button type="button" onClick={handleLogin}>
                            Login
                        </button>
                    )}
                </div>
                <div>
                    <p>
                        Please note that the login process may take upto a minute as the server spins up. 
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
