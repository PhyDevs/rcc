import React from 'react'
import Accordion from '../shared/Accordeon/Accordion'


function PokemonVersions({versions}) {

    return <>
        <h3 className="indent-section-title">Generations:</h3>
        <Accordion>
        {
            !!versions && !!versions.versions ?
                Object.values(versions.versions).map((version, i) =>
                    <Accordion.Item key={i} title={`Generation ${i+1}`}>
                        {
                            Object.keys(version).map((generation, i) => <div key={i}>
                                <h4 className="text-center">{generation}</h4>
                                <div className="elems-center mb-2">
                                {
                                    Object.values(version[generation]).map((genImg, i) =>
                                    genImg !== null && typeof genImg === "string" ?
                                            <img key={i} src={genImg} alt="pic" />
                                            : null
                                    )
                                }
                                </div>
                            </div>)
                        }
                    </Accordion.Item>
                )
                : []
        }
        </Accordion>
    </>
}

export default PokemonVersions
