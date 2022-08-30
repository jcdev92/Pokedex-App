import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PokemonCard from "./Pokedex/PokemonCard";
import Pagination from "./Pokedex/Pagination";
import SearchInput from "./Pokedex/SearchInput";
import SelectType from "./Pokedex/SelectType";

const Pokedex = () => {
  const nameTrainer = useSelector((state) => state.nameTrainer);

  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(20);

  const [pokemons, setPokemons] = useState();
  const [pokeSearch, setPokeSearch] = useState("");

  useEffect(() => {
    if (pokeSearch) {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokeSearch}`;
      const obj = {
        results: [
          {
            url,
          },
        ],
      };
      setPokemons(obj);
    } else {
      const URL = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
      axios
        .get(URL)
        .then((res) => setPokemons(res.data))
        .catch((err) => console.log(err));
    }
  }, [offset, pokeSearch]);

  const totalPokemons = pokemons?.count;

  return (
    <section className="pokedex">
      <header className="pokedex__box pokedex__box--header">
        <img
          src="src/assets/image11.png"
          alt="pokemon"
          className="pokedex__img"
        />
        <div className="box__red box__red--header"></div>
        <div className="box__black box__black--header"></div>
        <div className="box__ball box__ball--header">
          <div className="box__ball in in--header"></div>
        </div>
      </header>
      <div className="searchbar">
        <h1>
          Welcome trainer... <span>{nameTrainer}</span>! you can find your
          favorite pokemon here!
        </h1>
        <div className="searchbar__container">
          <div className="searchbar__input">
            <SearchInput setPokeSearch={setPokeSearch} />
          </div>
          <SelectType />
        </div>
      </div>
      <div className="pokedex__cards">
        {pokemons?.results.map((pokemon) => (
          <PokemonCard key={pokemon.url} url={pokemon.url} />
        ))}
      </div>
      <div className="pagination">
        <Pagination
          totalPokemons={totalPokemons}
          offset={offset}
          limit={limit}
          setOffset={setOffset}
          setPokemons={setPokemons}
          setPokeSearch={setPokeSearch}
        />
      </div>
    </section>
  );
};

export default Pokedex;
