import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const PokemonDetails = () => {
  const [pokemon, setPokemon] = useState();
  const { name } = useParams();

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((res) => {
        setPokemon(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const navigate = useNavigate();

  const handleReset = () => {
    navigate("/pokedex");
  };

  return (
    <section className="details">
      <header className="pokedex__box pokedex__box--header">
        <img
          src="src/assets/image11.png"
          alt="pokemon"
          className="pokedex__img"
        />
        <div className="box__red box__red--header"></div>
        <div className="box__black box__black--header"></div>
        <div className="box__ball box__ball--header" onClick={handleReset}>
          <div className="box__ball in in--header"></div>
        </div>
      </header>
      <article className="pokemon__details details__img">
        <body className="pokemon__details details__body">
            <div className="pokemon__details pokemon__img">
              <img src={pokemon?.sprites.other["official-artwork"]["front_default"]}
              alt={name} />
            </div> 
            <h1 className="pokemon__details details__body name ">{name}</h1>
            <li className="pokemon__details details__bod list__sizes">
              <span className="pokemon__details details__bod list__sizes--span">
                <h3>Height</h3>
                <p>{pokemon?.height}</p>
              </span>
              <span className="pokemon__details details__bod list__sizes--span">
                <h3>Weight</h3>
                <p>{pokemon?.weight}</p>
              </span>
            </li>  
            <li className="pokemon__details details__body  list__abilities">
              <span className="pokemon__details details__bod list__abilities--span">
                <div className="pokemon__details details__body sub__title">
                  <h3>Types</h3>
                </div>
                <p>
                  {pokemon?.types.map((type) => `${type.type.name} `)}
                </p>
              </span>
              <span className="pokemon__details details__bod list__abilities--span">
                <div className="pokemon__details details__body sub__title">
                  <h3>Abilities</h3>
                </div>
                <p>
                  {pokemon?.abilities.map((ability) => `${ability.ability.name} `)}
                </p>
              </span>
            </li>
        </body>
        <footer className="pokemon__details details__footer">
          <h1 className="pokemon__details details__footer details__footer__name">Stats</h1>
          <ul className="pokemon__details details__footer details__footer__list">
            {pokemon?.stats.map((stat) => (
              <li className="pokemon__footer pokemon__list-item" key={stat.stat.url}>
                <h3 className="pokemon__footer pokemon__list-item-title">{stat.stat.name}</h3>
                <p className="pokemon__footer pokemon__list-item-value">{stat.base_stat}</p>
              </li>
            ))}
          </ul>
        </footer>
      </article>
      <article className="pokemon__moves">
        <header className="pokemon__moves moves__header">
          <h1 className="pokemon__moves moves__name">Moves</h1>
        </header>
        <body className="pokemon__moves moves__body">
          <ul className="pokemon__moves moves__list">
            {pokemon?.moves.map((move) => (
              <li className="pokemon__moves list__item" key={move.move.url}>
                <h3 className="pokemon__move list__item-title">{move.move.name}</h3>
              </li>
            ))}
          </ul>
        </body>
      </article>
    </section>
  );
};

export default PokemonDetails;
