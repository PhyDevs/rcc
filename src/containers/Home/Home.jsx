import React from 'react'
import { useRequest } from '../../core/hooks/useRequest';
import Header from '../../components/shared/Header/Header'
import Footer from '../../components/shared/Footer/Footer'
import Content from '../../components/shared/Content/Content'
import Loading from '../../components/shared/Loading/Loading';
import Pagination from '../../components/shared/Pagination/Pagination';
import PokemonCard from '../../components/PokemonCard/PokemonCard'
import Input from '../../components/shared/Input/Input';

const PAGE_SIZE = 20;

function Home() {

    const [{ loading: pokemonsLoading }, getPokemons] = useRequest()
    
    const [pokemons, setPokemons] = React.useState(null)
    const [isFilered, setIsFilered] = React.useState(false)
    const [currentPage, setPage] = React.useState(1)
    const [lastPage, setLastPage] = React.useState(1)

    const searchTimerRef = React.useRef(null)

    React.useEffect(() => {
        if (isFilered)
            return    
        
        (async () => {
            const offset = (currentPage - 1) * PAGE_SIZE; 
            const { results, count } = await getPokemons(`pokemon?limit=${PAGE_SIZE}&offset=${offset}`)

            if (!!results && !!count) { 
                setPokemons(results)
                setLastPage(count / PAGE_SIZE)
            }
        })()
    }, [getPokemons, currentPage, isFilered])

    const goToNextPage = () => {
        setPage(prevPage => prevPage < lastPage ? prevPage+1 : prevPage)
    }
    const goToPrevPage = () => {
        setPage(prevPage => prevPage > 1 ? prevPage-1 : prevPage)
    }

    const filterPokemons = type => {
        clearTimeout(searchTimerRef.current);

        if (!!type) {
            searchTimerRef.current = setTimeout(async () => {                
                setIsFilered(true)

                const { pokemon } = await getPokemons(`type/${type}`)
                if (!!pokemon) {   
                    setPokemons(pokemon.map(({pokemon}) => pokemon))
                }
                else 
                {
                    setPokemons(null)
                    setLastPage(1)
                }
            }, 900);
        } else {
            setIsFilered(false)
        }
    }

    return <>
        <Header title="Home" />
        <Content>
            <Input name="pokemon-type" 
                   placeholder="Enter Pokemon Type" 
                   onChange={filterPokemons} 
            />
            {
                pokemonsLoading ? 
                    <Loading /> :
                    !!pokemons ?
                        <div className="content_container">
                        {
                            pokemons
                                .slice(0, 20)
                                .map(pokemon =>
                                <PokemonCard key={pokemon.name} name={pokemon.name} />)
                        }
                        </div>: 
                        <h3 className="text-center">
                            No Pokemons are found
                        </h3>
            }
            {
                !isFilered && <Pagination 
                    page={currentPage}
                    lastPage={lastPage}
                    prev={goToPrevPage} 
                    next={goToNextPage} 
                />
            }
        </Content>
        <Footer />
    </> 
}

export default Home