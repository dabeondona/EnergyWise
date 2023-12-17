import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';

const EnergyConsumptionChart = ({ userId }) => {
    const [energyData, setEnergyData] = useState([]);
    const [lastMonthUsage, setLastMonthUsage] = useState(null);
    const [lastMonthPrice, setLastMonthPrice] = useState(null);
    const [avgUsage, setAvgUsage] = useState(null);
    const [avgPrice, setAvgPrice] = useState(null);
    const [usageChange, setUsageChange] = useState(null);
    const [priceChange, setPriceChange] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/energyTable/user/${userId}`);
                const data = response.data;
                setEnergyData(data);

                if(data && data.length > 0) {
                    const lastMonthData = data[data.length - 1];
                    setLastMonthUsage(lastMonthData.ectConsumption);
                    setLastMonthPrice(lastMonthData.ectPrice);

                    const totalUsage = data.reduce((acc, curr) => acc + curr.ectConsumption, 0);
                    const totalPrice = data.reduce((acc, curr) => acc + curr.ectPrice, 0);
                    const averageUsage = (totalUsage / data.length).toFixed(2);
                    const averagePrice = (totalPrice / data.length).toFixed(2);
                    setAvgUsage(averageUsage);
                    setAvgPrice(averagePrice);

                    if(data.length > 1) {
                        const prevMonthData = data[data.length - 2];
                        const usagePercentChange = (((lastMonthData.ectConsumption - prevMonthData.ectConsumption) / prevMonthData.ectConsumption) * 100).toFixed(2);
                        const pricePercentChange = (((lastMonthData.ectPrice - prevMonthData.ectPrice) / prevMonthData.ectPrice) * 100).toFixed(2);
                        setUsageChange(usagePercentChange);
                        setPriceChange(pricePercentChange);
                    }
                }
            } catch(error) {
                console.error('Error fetching energy data:', error);
            }
        };

        fetchData();
    }, [userId]);


    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ width: '70%' }}>
                <BarChart width={1000} height={300} data={energyData} margin={{top: 20, right: 0, left: 0, bottom: 5,}}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="ectMonth" />
                    <YAxis tickFormatter={(value) => `${value} kWh`} />
                    <Tooltip />
                    <Bar dataKey="ectConsumption" fill="#F3DC8B" />
                </BarChart>

                <BarChart width={1000} height={300} data={energyData} margin={{top: 20, right: 0, left: 0, bottom: 5,}}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="ectMonth" />
                    <YAxis tickFormatter={(value) => `₱ ${value}`} />
                    <Tooltip />
                    <Bar dataKey="ectPrice" fill="#73D2F8"/>
                </BarChart>
            </div>

            <div style={{ width: '30%', padding: '10px', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <p>Last Month Usage: {lastMonthUsage ? `${lastMonthUsage} kWh` : 'N/A'}</p>
                <p>Last Month Price: {lastMonthPrice ? `₱ ${lastMonthPrice}` : 'N/A'}</p>
                <p>Average Usage: {avgUsage ? `${avgUsage} kWh` : 'N/A'}</p>
                <p>Average Price: {avgPrice ? `₱ ${avgPrice}` : 'N/A'}</p>
                <p>Usage Percentage: {usageChange ? `${usageChange}%` : 'N/A'}</p>
                <p>Price Percentage: {priceChange ? `${priceChange}%` : 'N/A'}</p>
            </div>
        </div>
    );
};

export default EnergyConsumptionChart;
