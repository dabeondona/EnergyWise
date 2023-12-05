import React, {useState, useRef, useContext, useEffect} from "react";
import { AuthContext } from "./context/AuthProvider";
import {useNavigate, Link} from 'react-router-dom';
import axios from 'axios';

export default function TestPage() {
    let navigate = useNavigate();
    const userDetails = JSON.parse(localStorage.getItem('userDetails')); // userDetails.firstName, lastName, email, username
    const { auth } = useContext(AuthContext);

    useEffect(() => {
        if (!auth) {
            navigate('/login');
        }
    }, [auth, navigate]);

    return (

        <div>
            <h1>Welcome, {userDetails.firstName} {userDetails.lastName}</h1>
            <p>Email: {userDetails.email}</p>
        </div>
    );
};
