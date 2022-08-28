import axios from 'axios'
import React, { useEffect, useState } from 'react'
import PokemonCard from './Pokedex/PokemonCard'

const Pokedex = () => {

  const [pokemons, setPokemons] = useState()

  useEffect(() => {
    const URL = 'https://pokeapi.co/api/v2/pokemon'
    axios.get(URL)
      .then(res => setPokemons(res.data))
      .catch(err => console.log(err))
  }, [])

  return (
    <section className="pokedex">
      <header className="pokedex__box pokedex__box--header">
        <img src="src/assets/image11.png" alt="pokemon" className="pokedex__img"/> 
        <div className="box__red box__red--header"></div>
        <div className="box__black box__black--header"></div>
        <div className="box__ball box__ball--header">
          <div className="box__ball in in--header"></div>
        </div>
      </header>
      <div className='pokedex__cards'>
        {
          pokemons?.results.map(pokemon => (
            <PokemonCard 
              key={pokemon.url}
              url={pokemon.url}
            />
          ))
        }
      </div>
    </section>
  )
}

export default Pokedex