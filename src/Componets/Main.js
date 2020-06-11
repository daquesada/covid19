import React from 'react'
import { useHttpRequest } from '../Hooks/HttpRequest'
import Card from './Card';
import config from '../config/config'

export default function Main() {
    let cont = 0;
    let res = useHttpRequest(config.API_URL+'countries');
    let countries = res.data.sort((a, b) => b.latest_data.confirmed - a.latest_data.confirmed);
    
    // let timeline = useHttpRequest(config.API_URL+'timeline');
    return (
        <div>
            <div className='row mt-5'>
                <div className='col-md-4'>
                    <Card title='Confirmed' number='1000' />
                </div>
                <div className='col-md-4'>
                    <Card title='Recovered' number='222222'/>
                </div>
                <div className='col-md-4'>
                    <Card title='Deaths' number='3333333' />
                </div>
            </div>

            <div className='col-md-8 mt-3 mx-auto'>
                <table className="table" >
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Country</th>
                            <th scope="col">Confirmed</th>
                            <th scope="col">Recovered</th>
                            <th scope="col">Deaths</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            countries.map((country) =>
                                <tr key={country.code}>
                                    <th scope="row">{cont = cont+1}</th>
                                    <td>{country.name}</td>
                                    <td>{new Intl.NumberFormat().format(country.latest_data.confirmed)}</td>
                                    <td>{new Intl.NumberFormat().format(country.latest_data.recovered)}</td>
                                    <td>{new Intl.NumberFormat().format(country.latest_data.deaths)}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
