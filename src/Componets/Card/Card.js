import React from 'react'
import './Card.css'
// style="width: 18rem;"
export default function Card(props) {
    let color = props.color
    return (
        <div className="card" >
            <div className="card-body">
                <h4 className="card-title text-muted text-center" >{props.title}</h4>
                <h2 className="card-subtitle mb-2 text-center" style={{ color: color }}>{props.number}</h2>
                {props.table}
                {props.children}
            </div>
        </div>
    )
}
