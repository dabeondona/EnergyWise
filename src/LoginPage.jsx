import React from "react";
import { useNavigate } from 'react-router-dom';
import "./Loginstyle.css";

export default function LoginPage() {
    let history = useNavigate();

    const goToTestPage = () => {
        history('/testpage');
    };

    return (
        <div className="login-page">
            <div className="div">
                <div className="overlap">
                    <p className="text-wrapper">Log in to your account</p>
                    <div className="group">
                        <div className="overlap-group-wrapper">
                            <div className="overlap-group">
                                <input
                                    type="text"
                                    placeholder="Enter username"
                                    className="input-field"
                                />
                            </div>
                        </div>
                        <div className="overlap-wrapper">
                            <div className="overlap-group">
                                <input
                                    type="password"
                                    placeholder="Enter password"
                                    className="input-field"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="div-wrapper">
                        <button className="overlap-2" onClick={goToTestPage}>
                            <div className="text-wrapper-3">LOGIN</div>
                        </button>
                    </div>
                    <div className="overlap-3">
                        <div className="text-wrapper-4">Don’t have an account?</div>
                        <div className="text-wrapper-5">Register now</div>
                    </div>
                    <img className="logo-energywise" alt="Logo energywise" src="logo_energywise.png" />
                </div>
                <div className="text-wrapper-6">HOME</div>
                <div className="text-wrapper-7">ABOUT US</div>
                <div className="text-wrapper-8">PRICING</div>
                <div className="overlap-4">
                    <img className="vector" alt="Vector" src="test.png" />
                    <div className="group-2" />
                </div>
            </div>
        </div>
    );
};
