import React from 'react'
import { useRequest } from '../../core/hooks/useRequest';
import Accordion from '../shared/Accordion/Accordion'
import Loading from '../shared/Loading/Loading';


function PokemonEvolutions({pokemonId}) {

    const [{ data: evolution, loading: evolutionLoading }, getEvolution] = useRequest()

    const getEvolutions = async () => {
        if (!evolution) {
            await getEvolution(`evolution-chain/${pokemonId}`)
        }
        
    }

    return <>
        <Accordion>
            <Accordion.Item title="Evolutions: " callback={getEvolutions}>
            {
                evolutionLoading ? 
                    <Loading /> :
                    !!evolution ? 
                        <ul>
                            <li>
                                <strong>Species: </strong>
                                {evolution.chain.species.name}
                            </li>
                            <li>
                                <strong>Is baby: </strong>
                                {evolution.chain.is_baby ? 'Yes' : 'No'}
                            </li>
                            <li>
                                <strong>Evolves to: </strong>
                                {evolution.chain.evolves_to[0].species.name}
                            </li>
                        </ul>
                        : <div className="text-center">None</div>
            }
            </Accordion.Item>
        </Accordion>
    </>
}

export default PokemonEvolutions
