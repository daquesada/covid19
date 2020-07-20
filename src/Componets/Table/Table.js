import React, { useState } from 'react'
import Graphic from '../Graphic/Graphic'
import './Table.css'

export default function Table(props) {
    const [country, setCountry] = useState(props.topCountry);

    let countries = props.countries;
    
    return (
        <div >
            <div>
                <Graphic country={country} />
            </div>
            <div className="mb-2 mt-5" style={{ height: '400px', overflow: 'auto' }}>
                <table className="table table-hover" >
                    <thead style={{ position: 'sticky', top: '0' }}>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Country</th>
                            <th scope="col">Total Cases</th>
                            <th scope="col">New Cases</th>
                            <th scope="col">Total Recovered</th>
                            <th scope="col">Total Deaths</th>
                        </tr>
                    </thead>
                    <tbody  >
                        {
                            countries.map((country, index) =>
                                <tr key={country.code} onClick={() => {setCountry(country.code)}} >
                                    <th scope="row">{index + 1}</th>
                                    <td>{country.name}</td>
                                    <td>{new Intl.NumberFormat().format(country.latest_data.confirmed)}</td>
                                    <td>{new Intl.NumberFormat().format(country.today.confirmed)}</td>
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
