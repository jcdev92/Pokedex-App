import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StatPokemon from './StatPokemon'

const PokemonCard = ({url, totalPokemonLength, limit, offset}) => {

  const [pokemon, setPokemon] = useState()

  const navigate = useNavigate()

  useEffect(() => {
    axios.get(url)
      .then(res => {
        setPokemon(res.data)
      })
      .catch(err => console.log(err))
  }, [])

  console.log(pokemon)

  const handleClick = () => navigate(`/pokedex/${pokemon?.name}`)

  return (
    <article onClick={handleClick} className='card'>
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