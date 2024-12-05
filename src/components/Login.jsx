import React from "react";
import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";

const Login = () => {
    const fetchData = useFetch();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        login(email, password);
    };

    const login = async (email, password) => {
        const body = { email, password };
        const { ok, msg, data } = await fetchData("/users/login", "POST", body);

        if (ok) {
            const { accessToken } = data;
            localStorage.setItem("token", accessToken);
            alert("Logged in successfully");
        } else {
            console.error(msg);
            alert("Logged in failed");
        }
    };

    return (
        <div className="flex justify-center">
            <div className="w-1/2 bg-gray-300 h-screen"></div>
            <div className="w-1/2 flex flex-col justify-center p-8">
                <h1 className="text-4xl font-semibold">Welcome Back Athlete</h1>
                <form
                    className="flex flex-col space-y-4 mt-4"
                    onSubmit={handleSubmit}
                >
                    <input
                        type="email"
                        placeholder="Email"
                        className="p-2 border border-gray-900 rounded"
                        value={email}
                        onChange={onChangeEmail}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="p-2 border border-gray-900 rounded"
                        value={password}
                        onChange={onChangePassword}
                    />
                    <button
                        className="bg-blue-500 text-white p-2 rounded"
                        type="submit"
                    >
                        Login
                    </button>
                    <p>Don't have an account?</p>
                    <Link
                        to="/register"
                        className="text-blue-500 hover:underline"
                    >
                        Sign up here
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default Login;
