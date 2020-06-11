import React from 'react'
// style="width: 18rem;"
export default function Card(props) {
    return (
        <div className='container'>
            <div className="card" >
                <div className="card-body">
                    <h5 className="card-title text-center">{props.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted text-center">{props.number}</h6>
                </div>
            </div>
        </div>
    )
}
