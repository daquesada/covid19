import React from 'react'
import {useHttpRequest} from '../Hooks/HttpRequest'

export default function Main() {
    let res = useHttpRequest('https://corona-api.com/countries');
    console.log(res.data.sort((a,b)=>b.latest_data.confirmed-a.latest_data.confirmed))
    return (
        <div>
            {
                res.data.map((country)=>
                    <div key={country.code}>
                        {country.name}
                    </div>
                )
            }
        </div>
    )
}
