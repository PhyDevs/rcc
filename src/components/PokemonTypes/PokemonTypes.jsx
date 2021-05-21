import React from 'react'
import { Link } from '@reach/router'

import './PokemonTypes.scss'


function PokemonTypes({types}) {

    return <div className="mb-3">
        <h3 className="indent-section-title">Types:</h3>
        {
            !!types && types.map(({type, slot}) => 
                <Link key={slot} to={`/type/${type.name}`} >
                    <div className="type-link">{type.name}</div>
                </Link>
            )
        }
    </div>
}

export default PokemonTypes