import React, { useState } from 'react'
import { useEffect } from 'react';
import config from '../../config/config'
import {useHttpRequest} from '../../Hooks/HttpRequest';

export const timelineContext = React.createContext({
    stats: { deaths: 0, confirmed: 0, recovered: 0 }
})

export function Timeline({ children }) {
    const { data, loading } = useHttpRequest(config.API_URL + 'timeline')
    const [stats, setStats] = useState({ deaths: 0, confirmed: 0, recovered: 0 })

    useEffect(() => {
        if(data.length > 0){
            const deaths = data[0].deaths
            const confirmed = data[0].confirmed
            const recovered = data[0].recovered
            setStats({ deaths, confirmed, recovered });
        }
    }, [data]);

    return (
        <timelineContext.Provider
            value={{
                stats,
                loadingTimeline: loading
            }}
        >
            {children}
        </timelineContext.Provider>
    )
}
