import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StatPokemon from "./StatPokemon";

const PokemonCard = ({ url, totalPokemonLength, limit, offset }) => {
  const [pokemon, setPokemon] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setPokemon(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleClick = () => navigate(`/pokedex/${pokemon?.name}`);

  return (
    <article
      onClick={handleClick}
      className="card"
      style={{
        color: `var(--color-font-${pokemon?.types[0].type.name})`,
      }}
    >
      <header className="card__header">
        <div
          className="middle__background"
          style={{
            backgroundImage: `var(--color-${pokemon?.types[0].type.name})`,
          }}
        ></div>
        <img
          src={pokemon?.sprites.other["official-artwork"]["front_default"]}
          alt=""
        />
      </header>
      <section className="card__body">
        <h2>{pokemon?.name}</h2>
        <h3>Type</h3>
        <ul>
          {pokemon?.types.map((slot) => (
            <li
              key={slot.type.url}
              style={{ color: `var(--color-font-${slot.type.name})` }}
            >
              &nbsp;{slot.type.name}
            </li>
          ))}
        </ul>
      </section>
      <footer className="card__footer">
        <ul className="footer__container">
          {pokemon?.stats.map((stat) => (
            <StatPokemon key={stat.stat.url} infoStat={stat} />
          ))}
        </ul>
      </footer>
    </article>
  );
};

export default PokemonCard;
