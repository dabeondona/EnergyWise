import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "./context/AuthProvider";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function RatePage() {
    const [rates, setRates] = useState({
        month: '',
        price: null,
        price_luzon: null,
        price_mindanao: null,
    });

    const [inputtedValue, setInputtedValue] = useState('');
    const [currentRate, setCurrentRate] = useState(null);
    const [output, setOutput] = useState('');
    let navigate = useNavigate();
    const userDetails = JSON.parse(localStorage.getItem('userDetails')); // userDetails.firstName, lastName, email, username
    const { auth } = useContext(AuthContext);

    useEffect(() => {
        if (!auth) {
            navigate('/login');
        } else {
            fetchCurrentMonthRate();
        }
    }, [auth, navigate]);

    const fetchCurrentMonthRate = async () => {
        try {
            const response = await axios.get('http://localhost:8080/rate/getAllRates');
            const currentMonthIndex = new Date().getMonth(); 
            const currentMonthName = new Date().toLocaleString('default', { month: 'long' });
            const rateForCurrentMonth = response.data.find(rate => {
                const rateMonth = new Date(rate.date).getMonth();
                return rateMonth === currentMonthIndex;
            });

            if (rateForCurrentMonth) {
                setRates({
                    month: currentMonthName,
                    price: rateForCurrentMonth.price,
                    price_luzon: rateForCurrentMonth.price_luzon,
                    price_mindanao: rateForCurrentMonth.price_mindanao,
                });
            }
        } catch (error) {
            console.error('Failed to fetch rates', error);
        }
    };

    const handleCalculation = async (e) => {
        e.preventDefault();
        if (rates.price && inputtedValue) {
            const calculatedOutput = rates.price * inputtedValue;
            setOutput(calculatedOutput.toFixed(2)); 
        }
    };

    return (
        <div>
            <h3>Energy Rate</h3>
            <h5>Hi, Welcome {userDetails.username}</h5>
            <div>
                <h2>Energy Calculator</h2>
                <input type='text'
                    id='energyUsage'
                    autoComplete="off"
                    required
                    className="input-field"
                    placeholder="Enter energy usage"
                    value={inputtedValue}
                    onChange={(e) => setInputtedValue(e.target.value)} />
                <button className="button" onClick={handleCalculation}>Calculate</button>
                <p>Output here: {output} php</p>
            </div>

            <div>
                <h3>Energy Rate for {rates.month}</h3>
                <p>Current Price: {rates.price}</p>
                <p>Price Luzon: {rates.price_luzon}</p>
                <p>Price Mindanao: {rates.price_mindanao}</p>
            </div>
        </div>
    );
};
