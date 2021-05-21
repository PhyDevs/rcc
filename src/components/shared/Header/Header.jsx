import React from 'react'

import './Header.scss'


function Header({title}) {

    return <header className="main-nav">
        <h1 className="logo">
            {title}
        </h1>
    </header>
}

export default Header