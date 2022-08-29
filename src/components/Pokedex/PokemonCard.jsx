import axios from 'axios'
import React, { useEffect, useState } from 'react'
import StatPokemon from './StatPokemon'

const PokemonCard = ({url}) => {

  const [pokemon, setPokemon] = useState()

  useEffect(() => {
    axios.get(url)
      .then(res => setPokemon(res.data))
      .catch(err => console.log(err))
  }, [])

  console.log(pokemon)

  return (
    <article className='card'>
      <header className='card__header'>
        <img src={pokemon?.sprites.other["official-artwork"]["front_default"]} alt="" />
      </header>
      <section className='card__body'>
        <h3>{pokemon?.name}</h3>
        <ul>
          {
            pokemon?.types.map(slot => (
              <li key={slot.type.url}>&nbsp;{slot.type.name}</li>
            ))
          }
        </ul>
      </section>
      <footer className="card__footer">
        <ul>
          {
            pokemon?.stats.map(stat => (
              <StatPokemon 
                key={stat.stat.url}
                infoStat={stat}
              />
            ))
          }
        </ul>
      </footer>
    </article>
  )
}

export default PokemonCard