import React from 'react'

import './Input.scss'


function Input({onChange, ...rest}) {

    const handleChange = e => {
        onChange(e.target.value)
    }

    return <div className="input-container">
        <input {...rest} onChange={handleChange} />
    </div>
}

export default Input
