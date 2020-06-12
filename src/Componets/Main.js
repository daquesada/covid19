import React from 'react'
import { useHttpRequest } from '../Hooks/HttpRequest'
import Card from './Card/Card';
import config from '../config/config'
import Loading from './Loading';

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
            <div className='row mt-5'>
                <div className='col-md-4'>
                    <Card title='Confirmed' color='#e9ec1e' number={new Intl.NumberFormat().format(confirmed)} />
                </div>
                <div className='col-md-4'>
                    <Card title='Recovered' color="#4cff16" number={new Intl.NumberFormat().format(recovered)} />
                </div>
                <div className='col-md-4'>
                    <Card title='Deaths' color='#ff3b3b' number={new Intl.NumberFormat().format(deaths)} />
                </div>
            </div>

            <div className='col-md-8 mt-5 mx-auto'>
                {/* <div style={{ height: '200px', overflow: 'auto' }}>...</div> */}
                <table className="table table-hover" >
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Country</th>
                            <th scope="col">Confirmed</th>
                            <th scope="col">Recovered</th>
                            <th scope="col">Deaths</th>
                        </tr>
                    </thead>
                    <tbody >
                        {
                            countries.map((country, index) =>
                                <tr key={country.code}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{country.name}</td>
                                    <td>{new Intl.NumberFormat().format(country.latest_data.confirmed)}</td>
                                    <td>{country.latest_data.recovered !== 0 ? new Intl.NumberFormat().format(country.latest_data.recovered) : 'N/A'}</td>
                                    <td>{country.latest_data.deaths !== 0 ? new Intl.NumberFormat().format(country.latest_data.deaths) : 'N/A'}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>

            </div>
        </div>
    )
}
