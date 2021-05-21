import React from 'react'
import { Link } from '@reach/router'

import './PokemonCard.scss'

function PokemonCard({name}) {

    return <div className="pok-card-container">
        <Link to={`/pokemon/${name}`}>
            <div className="pok-card">
                <h2>{name}</h2>
            </div>
        </Link>
    </div>
}

export default PokemonCard
