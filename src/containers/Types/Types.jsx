import React from 'react'
import PokemonCard from '../../components/PokemonCard/PokemonCard'
import Content from '../../components/shared/Content/Content'
import Footer from '../../components/shared/Footer/Footer'
import Header from '../../components/shared/Header/Header'
import Loading from '../../components/shared/Loading/Loading'
import Pagination from '../../components/shared/Pagination/Pagination'
import { useRequest } from '../../core/hooks/useRequest'


const PAGE_SIZE = 20;

function Types({name}) {

    const [{ data: type, loading: pokemonsLoading }, getPokemons] = useRequest()

    const [currentPage, setPage] = React.useState(1)
    const [lastPage, setLastPage] = React.useState(1)

    React.useEffect(() => {
        (async () => {
            const { pokemon } = await getPokemons(`type/${name}`)

            if (!!pokemon) {
                setLastPage(pokemon.length / PAGE_SIZE)
            }
        })()
    }, [getPokemons, name])

    const goToNextPage = () => setPage(prevPage => prevPage < lastPage ? prevPage+1 : prevPage)
    const goToPrevPage = () => setPage(prevPage => prevPage > 1 ? prevPage-1 : prevPage)

    return <>
        <Header title={`Type: ${name}`} />
        <Content>
            {
                pokemonsLoading ? 
                    <Loading /> :
                    !!type ?
                        <div className="content_container">
                        {
                            type.pokemon
                                .slice(
                                    (currentPage - 1) * PAGE_SIZE, 
                                    currentPage * PAGE_SIZE
                                )
                                .map(({pokemon}) =>
                                <PokemonCard key={pokemon.name} name={pokemon.name} />)
                        }
                        </div>: 
                        <h3 className="text-center">
                            No Pokemons are found
                        </h3>
            }
            <Pagination
                page={currentPage}
                lastPage={lastPage}
                prev={goToPrevPage} 
                next={goToNextPage} 
            />
        </Content>
        <Footer />
    </>
}

export default Types