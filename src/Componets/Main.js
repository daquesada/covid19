import React, { useEffect } from 'react'
import { useHttpRequest } from '../Hooks/HttpRequest'
import Card from './Card/Card';
import config from '../config/config'
import Loading from './Loading';
import Table from './Table/Table';
import { useState } from 'react';

export default function Main() {
    let res = useHttpRequest(config.API_URL + 'countries');
    let timeline = useHttpRequest(config.API_URL + 'timeline');

    const [deaths, setDeaths] = useState(0);
    const [confirmed, setConfirmed] = useState(0);
    const [recovered, setRecovered] = useState(0);
    const [countries, setCountries] = useState([])
    
    useEffect(() => {
        let countries = res.data.sort((a, b) => b.latest_data.confirmed - a.latest_data.confirmed);
        setCountries(countries);
        setDeaths(timeline.data[0]?timeline.data[0].deaths:0);
        setRecovered(timeline.data[0]?timeline.data[0].recovered:0);
        setConfirmed(timeline.data[0]?timeline.data[0].confirmed:0);
    }, [res, timeline]);

    if (res.loading || timeline.loading) {
        return (
            <div className="mx-auto mt-auto text-center">
                <Loading />
            </div>
        )
    }
    return (
        <div>
            <div className='row'>
                <div className='col col-md-4 mt-3'>
                {/* #e9ec1e */}
                    <Card title='Confirmed' color='#fa983a' number={new Intl.NumberFormat().format(confirmed)} />
                </div>
                <div className='col-md-4 mt-3'>
                    <Card title='Recovered' color="#4cff16" number={new Intl.NumberFormat().format(recovered)} />
                </div>
                <div className='col-md-4 mt-3'>
                    <Card title='Deaths' color='#ff3b3b' number={new Intl.NumberFormat().format(deaths)} />
                </div>
            </div>
            <div className="row mt-3" >
                <div className="col" >
                    <Card title={'Reported cases by country'}>
                        <Table countries={countries} topCountry='us'/>
                    </Card>
                </div>
            </div>
        </div>
    )
}
