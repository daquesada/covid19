import React, { useContext,useState,useEffect } from 'react'
import {
    LineChart, XAxis, Line, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { useHttpRequest } from '../../Hooks/HttpRequest';
import config from '../../config/config';
import { context } from '../Context/Country'

export default function Graphic() {
    const [daily, setDaily] = useState([])
    const [name, setName] = useState('');
    const {countryName} = useContext(context)
    const res = useHttpRequest(config.API_URL+'countries/'+countryName);
    
    useEffect(()=>{
        var data=[];
        let timeline = res.data.timeline === undefined ? [] : res.data.timeline;
        let aux = timeline.sort((a, b) => a.confirmed - b.confirmed);
        aux.forEach((element) => {
            let stats = {
                name: element.date,
                confirmed: element.confirmed, 
                recovered: element.recovered,
                deaths: element.deaths,
            }
            data.push(stats);
        });
        setName(res.data.name);
        setDaily(data);
    },[res])
    
    return (
        <div style={{ width: '100%', height: 300 }}>
            <p className="text-center">{name}</p>
            <ResponsiveContainer>
                <LineChart
                    width={500}
                    height={300}
                    data={daily}
                    margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="confirmed" stroke="#fa983a" strokeWidth={2} dot={false}/>
                    <Line type="monotone" dataKey="recovered" stroke="#4cff16" strokeWidth={2} dot={false}/>
                    <Line type="monotone" dataKey="deaths" stroke="#ff3b3b" strokeWidth={2} dot={false}/>
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}