import axios from 'axios'
import React, { useEffect, useState } from 'react'
import nameTrainerSlice, { setNameTrainer } from '../store/slices/nameTrainer.slice'
import { useSelector } from 'react-redux'
import PokemonCard from './Pokedex/PokemonCard'

const Pokedex = () => {

  const nameTrainer = useSelector(state => state.nameTrainer)

  const [pokemons, setPokemons] = useState()

  useEffect(() => {
    const URL = 'https://pokeapi.co/api/v2/pokemon/?limit=32&offset=1'
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
      <div className='searchbar'>
        <h1>
          Welcome  trainer... <span>{nameTrainer}</span>! you can find your favorite pokemon here!
        </h1>
        <div className="searchbar__container">
          <div className="searchbar__input">
            <input type="text" />
            <button type="button">Search</button>
          </div>
          <select className="searchbar__select"></select>
        </div>
      </div>
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
      <div className="pagination">
      </div>
    </section>
  )
}

export default Pokedex