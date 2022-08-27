import React from 'react'

const StatPokemon = ({infoStat}) => {
  return (
    <li>
      <h4>{infoStat.stat.name}</h4>
      <p>{infoStat.base_stat}</p>
    </li>
  )
}

export default StatPokemon