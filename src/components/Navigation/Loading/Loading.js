import React from 'react'
import './Loading.css'

const loading = (props) => (
    <div className="d-flex flex-column justify-content-center align-items-center Loading">
        <div className="lds-facebook">
            <div></div><div></div><div></div>
        </div>
        <div>Loading, please do not close this browser.</div>
    </div>
)

export default loading