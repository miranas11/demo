import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <section className=" login">
            <h1>JALA ACADEMY</h1>
            <h2>Login Credentials</h2>
            <p>Email : training@jalaacademy.com</p>
            <p>Password : jobprogram</p>
            <h4>Learn Everything on Real-Time Scenarios</h4>
            <div className="login__form-container">
                <p>Sign In</p>
                <form className="login__form">
                    <input
                        className="login__input"
                        type="text"
                        placeholder="Email or Phone Number"
                    />
                    <input
                        className="login__input"
                        type="password"
                        placeholder="Password"
                    />
                    <div>
                        <input type="checkbox" id="remember-me" />
                        <label for="remember-me">Remember Me</label>

                        <input
                            className="login__btn btn"
                            type="submit"
                            value="SIGN IN"
                        ></input>
                    </div>
                    <p>-OR-</p>
                    <button className="login__forgot-btn btn">
                        FORGOT PASSWORD
                    </button>
                    <Link to={""}>ADMIN LOGIN</Link>
                </form>
            </div>
            <div className="login__footer">
                <p>
                    JALA Academy offers Job Guaranteed Programs for Freshers to
                    12 years’ experience on Full Stack Development / Automation
                    Testing / Dev-Ops / QA/ SDET/Cyber Security / RPA / Cloud
                    Technologies. Training would be completely on live Project
                    scenarios Read our website JALA Academy for more details :
                    https://jalaacademy.com/
                </p>
            </div>
        </section>
    );
};

export default Login;
