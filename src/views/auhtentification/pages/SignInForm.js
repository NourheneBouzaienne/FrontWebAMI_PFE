import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignInForm = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === "username") {
            setUsername(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post("http://localhost:8060/api/auth/signinGest", {
                username: username,
                password: password,
            });

            if (response.status === 200) {
                localStorage.setItem("token", "Bearer " + response.data.accessToken);
                console.log(response.data.accessToken)
                // Stockez le token dans le localStorage
                navigate("/dashboards/dashboard1"); // Utilisez useNavigate pour naviguer vers le tableau de bord
            }

        } catch (error) {
            setErrorMessage("Veuillez vérifier votre identifiant et/ou mot de passe");
        }
    };

    return (
        <div className="formCenter">
            <form className="formFields" onSubmit={handleSubmit}>
                <div className="formField">
                    <label className="formFieldLabel">Username</label>
                    <input
                        id="username"
                        className="formFieldInput"
                        placeholder="Enter your username"
                        name="username"
                        value={username}
                        onChange={handleChange}
                    />
                </div>

                <div className="formField">
                    <label className="formFieldLabel" htmlFor="password">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="formFieldInput"
                        placeholder="Enter your password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                    />
                </div>

                {errorMessage && <div className="errorMessage">{errorMessage}</div>}

                <div className="formField">
                    <button className="formFieldButton">Sign In</button>{" "}
                    <Link to="/" className="formFieldLink">
                        Create an account
                    </Link>
                </div>

                <div className="socialMediaButtons">
                    <div className="facebookButton">{/* <FacebookLoginButton onClick={() => alert("Hello")} /> */}</div>

                    <div className="instagramButton">{/* <InstagramLoginButton onClick={() => alert("Hello")} /> */}</div>
                </div>
            </form>
        </div>
    );
};

export default SignInForm;
