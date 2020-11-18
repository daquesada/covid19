import React, { useState } from 'react'
import { useEffect } from 'react';
import config from '../../config/config'
import {useHttpRequest} from '../../Hooks/HttpRequest'

export const context = React.createContext({
    countryName: '',
    setCountryName: () => { },
    countries: []
})

export function Country({ children }) {
    const [countryName, setCountryName] = useState('US');
    const [countries, setCountries] = useState([]);
    const { data, loading } = useHttpRequest(config.API_URL + 'countries');
    
    useEffect(() => {
        if(data.length >0){
            const globalTimeline = data.sort((a, b) => b.latest_data.confirmed - a.latest_data.confirmed);
            setCountries(globalTimeline);
        }            
    }, [data])

    return (
        <context.Provider
            value={{
                countryName,
                setCountryName,
                countries,
                loading
            }}
        >
            {children}
        </context.Provider>
    )
}
