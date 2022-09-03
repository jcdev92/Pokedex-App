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
        <div
          className="pokemon__details pokemon__img"
          style={{
            backgroundImage: `var(--color-${pokemon?.types[0].type.name})`
          }}
        >
          <img
            src={pokemon?.sprites.other["official-artwork"]["front_default"]}
            alt={name}
          />
        </div>
        <div className="pokemon__details details__body">
          <h1 className="pokemon__details pokemon__id">{`#${pokemon?.id}`}</h1>
          <div className="pokemon__details details__body name ">
            <div className="name__line"></div>
            <h1 style={{
            color: `var(--color-font-${pokemon?.types[0].type.name})`,
          }}>{name}</h1>
            <div className="name__line"></div>
          </div>
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
          <li className="pokemon__details details__body list__abilities">
            <span className="pokemon__details details__bod list__abilities--span">
              <div className="pokemon__details details__body sub__title">
                <h3>Types</h3>
              </div>
              <div className="pokemon__details details__body type__abilities">
                {pokemon?.types.map((type, index) => {
                  return (
                    <span
                      key={index}
                      className="pokemon__details sub__span sub__span--type"
                      style={{
                        backgroundImage: `var(--color-${type.type.name})`
                      }}
                    >
                      <h3>{type.type.name}</h3>
                    </span>
                  );
                })}
              </div>
            </span>
            <span className="pokemon__details details__bod list__abilities--span">
              <div className="pokemon__details details__body sub__title">
                <h3>Abilities</h3>
              </div>
              <div className="pokemon__details details__body type__abilities">
                {pokemon?.abilities.map((ability, index) => {
                  return (
                    <span
                      key={index}
                      className="pokemon__details sub__span sub__span--ability"
                    >
                      <h3>{ability.ability.name}</h3>
                    </span>
                  );
                })}
              </div>
            </span>
          </li>
        </div>
        <footer className="pokemon__details details__footer">
          <div className="pokemon__details details__footer details__footer__name">
            <h1>Stats</h1> <div className="title__line"></div>
          </div>
          <ul className="pokemon__details details__footer details__footer__list">
            {pokemon?.stats.map((stat) => (
              <li
                className="pokemon__footer pokemon__list-item"
                key={stat.stat.url}
              >
                <div className="pokemon__footer pokemon__list-item-container">
                  <h3 className="pokemon__footer pokemon__list-item-title">
                    {stat.stat.name}
                  </h3>
                  <p className="pokemon__footer pokemon__list-item-value">{`${stat.base_stat} / 150`}</p>
                </div>
                <div
                  className="pokemon__footer pokemon__list-item-bar"
                  style={{ width: `${stat.base_stat*0.7}%` }}
                ></div>
              </li>
            ))}
          </ul>
        </footer>
      </article>
      <article className="pokemon__moves">
        <header className="pokemon__moves moves__header">
          <h1>Moves</h1>
          <div className="title__line"></div>
        </header>
        <body className="pokemon__moves moves__body">
          <ul className="pokemon__moves moves__list">
            {pokemon?.moves.map((move) => (
              <li className="pokemon__moves list__item" key={move.move.url}>
                <h3 className="pokemon__move list__item-title">
                  {move.move.name}
                </h3>
              </li>
            ))}
          </ul>
        </body>
      </article>
    </section>
  );
};

export default PokemonDetails;
