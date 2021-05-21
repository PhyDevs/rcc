import React from 'react'


function Content({children}) {

    return <>
        <div className="container">
            {children}
        </div>
    </> 
}

export default Content