import React from 'react'
import { useHttpRequest } from '../Hooks/HttpRequest'
import Card from './Card/Card';
import config from '../config/config'
import Loading from './Loading';
import Table from './Table';

export default function Main() {
    let res = useHttpRequest(config.API_URL + 'countries');
    let countries = res.data.sort((a, b) => b.latest_data.confirmed - a.latest_data.confirmed);
    let timeline = useHttpRequest(config.API_URL + 'timeline');
    
    var deaths = 0;
    var confirmed = 0;
    var recovered = 0;

    timeline.data.forEach((item, index) => {
        if (index === 0) {
            deaths = item.deaths;
            recovered = item.recovered;
            confirmed = item.confirmed;
            index = timeline.data.length-1
        }
    });
    if (res.loading || timeline.loading) {
        return (
            <div className="container mx-auto mt-auto text-center">
                <Loading />
            </div>
        )
    }
    return (
        <div>
            <div className='row mt-3'>
                <div className='col col-md-4'>
                    <Card title='Confirmed' color='#e9ec1e' number={new Intl.NumberFormat().format(confirmed)} />
                </div>
                <div className='col-md-4'>
                    <Card title='Recovered' color="#4cff16" number={new Intl.NumberFormat().format(recovered)} />
                </div>
                <div className='col-md-4'>
                    <Card title='Deaths' color='#ff3b3b' number={new Intl.NumberFormat().format(deaths)} />
                </div>
            </div>
            <div className="row justify-content-center align-items-center">
                <div className="col col-md-8" >
                    <Card title={'This is a test'} />
                </div>
            </div>
            <div className="row" >
                {/* <div className='col col-md-12 mt-3 mx-auto'></div> */}
                <div className="col">
                    <Card table={Table(countries)} title={'Reported cases by country'}/>
                </div>

                {/* <div style={{ height: '200px', overflow: 'auto' }}>...</div> */}


            </div>
        </div>
    )
}
