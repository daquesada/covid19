import React from 'react';
import { useContext } from 'react';
import Graphic from '../Graphic/Graphic';
import './Table.css';
import { context } from '../Context/Country';

export default function Table() {
    const { setCountryName, countries } = useContext(context);


    return (
        <div >
            <div className="mb-5">
                <Graphic/>
            </div>
            <div className="mb-2 mt-3" style={{ height: '400px', overflow: 'auto' }}>
                <table className="table table-hover" >
                    <thead style={{ position: 'sticky', top: '0' }}>
                        <tr>
                            <th className="sticky-header" scope="col">#</th>
                            <th className="sticky-header" scope="col">Country</th>
                            <th className="sticky-header" scope="col">Total Cases</th>
                            <th className="sticky-header" scope="col">New Cases</th>
                            <th className="sticky-header" scope="col">Total Recovered</th>
                            <th className="sticky-header" scope="col">Total Deaths</th>
                        </tr>
                    </thead>
                    <tbody  >
                        {
                            countries.map((country, index) =>
                                <tr key={country.code} onClick={() => { setCountryName(country.code) }} >
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
