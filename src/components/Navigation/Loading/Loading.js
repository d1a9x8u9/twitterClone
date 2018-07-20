import React from 'react'
import './Loading.css'

const loading = (props) => (
    <div className="d-flex flex-column justify-content-center align-items-center Loading">
        <div className="sk-folding-cube">
            <div className="sk-cube1 sk-cube"></div>
            <div className="sk-cube2 sk-cube"></div>
            <div className="sk-cube4 sk-cube"></div>
            <div className="sk-cube3 sk-cube"></div>
        </div>
    </div>
)

export default loading