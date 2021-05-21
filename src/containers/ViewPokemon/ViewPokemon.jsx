import React from 'react'
import { useRequest } from '../../core/hooks/useRequest'
import Content from '../../components/shared/Content/Content'
import Footer from '../../components/shared/Footer/Footer'
import Header from '../../components/shared/Header/Header'
import Loading from '../../components/shared/Loading/Loading'
import PokemonEvolutions from '../../components/PokemonEvolutions/PokemonEvolutions'
import PokemonTypes from '../../components/PokemonTypes/PokemonTypes'
import PokemonVersions from '../../components/PokemonVersions/PokemonVersions'


function ViewPokemon({name}) {

    const [{ data: pokemon, loading: pokemonLoading }, getPokemon] = useRequest()

    React.useEffect(() => {
        (async () => {
            await getPokemon(`pokemon/${name}`)
        })()
    }, [name, getPokemon])


    return <>
        <Header title={`Pokemon: ${name}`} />
        <Content>
            {
                pokemonLoading ? 
                    <Loading /> :
                    !!pokemon ?
                        <div>
                            <h1 className="text-center">{pokemon.name}</h1>
                            <div className="elems-center mb-3">
                            {
                                Object.values(pokemon.sprites).map((sprite, i) =>
                                    sprite !== null && typeof sprite === "string" ?
                                    <img key={i} src={sprite} alt="pic" />
                                    : null
                                )
                            }
                            </div>
                            
                            <PokemonTypes types={pokemon.types} />
                            <PokemonEvolutions pokemonId={pokemon.id} />
                            <PokemonVersions versions={pokemon.sprites} />

                        </div> :
                        <h3 className="text-center">
                            No Pokemon was found
                        </h3>
            }
        </Content>
        <Footer />
    </> 
}

export default ViewPokemon