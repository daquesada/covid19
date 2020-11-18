import {useState, useEffect} from 'react'
import axios from 'axios'

export function useHttpRequest(API_URL) {
    const [Data, setData] = useState({data:[], loading:true})
    useEffect(()=>{
        
        async function getRequest(){
            const res = await axios.get(API_URL);
            setData({data:res.data.data, loading:false});
        }
        getRequest();
    },[API_URL]);
    
    return Data
}
