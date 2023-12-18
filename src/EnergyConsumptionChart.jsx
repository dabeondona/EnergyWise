import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';

export default function EnergyConsumptionChart ({ userId, userExists }) {
    const [energyData, setEnergyData] = useState([]);
    const [lastMonthUsage, setLastMonthUsage] = useState(null);
    const [lastMonthPrice, setLastMonthPrice] = useState(null);
    const [avgUsage, setAvgUsage] = useState(null);
    const [avgPrice, setAvgPrice] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if(!userExists) {
                console.log("User does not exist. Skipping data fetch.");
                return;
            }
    
            try {
                const response = await axios.get(`http://localhost:8080/energyTable/user/${userId}`);
                const data = response.data;

                const renamedData = data.map(item => ({
                    ...item,
                    Consumption: item.ectConsumption,
                    Price: item.ectPrice,
                }));
                setEnergyData(renamedData);

                if(data && data.length > 0) {
                    const lastMonthData = data[data.length - 2];
                    setLastMonthUsage(lastMonthData.ectConsumption);
                    setLastMonthPrice(lastMonthData.ectPrice);

                    const totalUsage = data.reduce((acc, curr) => acc + curr.ectConsumption, 0);
                    const totalPrice = data.reduce((acc, curr) => acc + curr.ectPrice, 0);
                    const averageUsage = (totalUsage / data.length).toFixed(2);
                    const averagePrice = (totalPrice / data.length).toFixed(2);
                    setAvgUsage(averageUsage);
                    setAvgPrice(averagePrice);
                }
            } catch(error) {
                console.error('Error fetching energy data:', error);
            }
        };

        fetchData();
    }, [userId, userExists]);


    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', gap:"0px"}}>
            
                <div style={{ width: '70%' }}>
                    <BarChart width={1000} height={300} data={energyData} margin={{top: 20, right: 0, left: 0, bottom: 5,}}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="ectMonth" />
                        <YAxis tickFormatter={(value) => `${value} kWh`} />
                        <Tooltip />
                        <Bar dataKey="Consumption" fill="#F3DC8B" />
                    </BarChart>

                    <BarChart width={1000} height={300} data={energyData} margin={{top: 20, right: 0, left: 0, bottom: 5,}}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="ectMonth" />
                        <YAxis tickFormatter={(value) => `₱ ${value}`} />
                        <Tooltip />
                        <Bar dataKey="Price" fill="#73D2F8"/>
                    </BarChart>
                </div>
                <div style={{ width: '30%', padding: '0px', marginTop:"10px", marginRight:"50px"}}>

                    <div style={{display:"flex", gap:"15px"}}>
                        <div style={{width:"50%", borderRadius:"8px 8px 8px 8px", paddingBottom:"10px", margin:"0px", boxShadow:"0 4px 8px rgba(0, 0, 0, 0.1)"}}>
                            <h5 style={{color:"#FFBD59", fontFamily:"Roboto-Bold, Helvetica", fontWeight:"600", backgroundColor:"#EFEFEF", textAlign:"center", borderRadius:"8px 8px", padding:"15px"}}>Last Month Usage</h5>
                            <p style={{color:"#F3DC8B", fontFamily:"Roboto-Black, Helvetica", fontSize:"20px", fontWeight:"600", textAlign:"center", marginTop:"15px"}}>{lastMonthUsage ? `${lastMonthUsage} kWh` : 'N/A'}</p>
                        </div>

                        <div style={{width:"50%", borderRadius:"8px 8px 8px 8px", paddingBottom:"10px", margin:"0px", boxShadow:"0 4px 8px rgba(0, 0, 0, 0.1)"}}>
                            <h5 style={{color:"#35C5FF", fontFamily:"Roboto-Bold, Helvetica", fontWeight:"600", backgroundColor:"#EFEFEF", textAlign:"center", borderRadius:"8px 8px", padding:"15px"}}>Last Month Price</h5>
                            <p style={{color:"#34ACDC", fontFamily:"Roboto-Black, Helvetica", fontSize:"20px", fontWeight:"600", textAlign:"center", marginTop:"15px"}}>{lastMonthPrice ? `₱ ${lastMonthPrice}` : 'N/A'}</p>
                        </div>
                    </div>

                    <div style={{marginTop:"20px"}}>
                        <div style={{width:"100%", borderRadius:"8px 8px 8px 8px", paddingBottom:"10px", margin:"0px", boxShadow:"0 4px 8px rgba(0, 0, 0, 0.1)"}}>
                            <h5 style={{paddingLeft:"30px", paddingTop:"30px", color:"#F3DC8B", fontSize:"18px"}}>Avg Usage</h5>
                            <p style={{paddingLeft:"30px", color:"#FFBD59", fontFamily:"Roboto-Black, Helvetica", fontSize:"20px", fontWeight:"600"}}>{avgUsage ? `${avgUsage} kWh` : 'N/A'}</p>
                        </div>
                    </div>

                    <div style={{marginTop:"20px"}}>
                        <div style={{width:"100%", borderRadius:"8px 8px 8px 8px", paddingBottom:"10px", margin:"0px", boxShadow:"0 4px 8px rgba(0, 0, 0, 0.1)"}}>
                            <h5 style={{paddingLeft:"30px", paddingTop:"30px", color:"#34ACDC", fontSize:"18px"}}>Avg Price</h5>
                            <p style={{paddingLeft:"30px", color:"#35C5FF", fontFamily:"Roboto-Black, Helvetica", fontSize:"20px", fontWeight:"600"}}>{avgUsage ? `${avgUsage} kWh` : 'N/A'}</p>
                        </div>
                    </div>
                </div>    
        </div>
    );
};


