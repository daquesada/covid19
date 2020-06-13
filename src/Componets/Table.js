import React from 'react'

export default function Table(props) {
    let countries = props;
    const onClickRow = (country)=>{
        console.log(country)
    }
    return (
        <div>
            <div classNAme="mb-2"style={{ height: '400px', overflow: 'auto' }}>
                <table className="table table-hover" >
                    <thead style={{position:'sticky',top:'0', backgroundColor:'#fff7f7'}}>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Country</th>
                            <th scope="col">Confirmed</th>
                            <th scope="col">Recovered</th>
                            <th scope="col">Deaths</th>
                        </tr>
                    </thead>
                    <tbody  >
                        {
                            countries.map((country, index) =>
                                <tr key={country.code} onClick={()=>onClickRow(country.name)}>
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
