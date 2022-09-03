import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PokemonCard from "./Pokedex/PokemonCard";
import Pagination from "./Pokedex/Pagination";
import SearchInput from "./Pokedex/SearchInput";
import SelectType from "./Pokedex/SelectType";

const Pokedex = () => {
  const nameTrainer = useSelector((state) => state.nameTrainer);

  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(20);
  const [totalPokemonLength, setTotalPokemonLength] = useState(0);
  const [pokemons, setPokemons] = useState();
  const [pokeSearch, setPokeSearch] = useState("");
  const [typeSelected, setTypeSelected] = useState("All");

  // console.log(displayType[0].pokemon.url)

  useEffect(() => {
    if (pokeSearch) {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokeSearch}`;
      const obj = {
        results: [{ url }],
      };
      setPokemons(obj);
    } else if (typeSelected !== "All") {
      const URL = `https://pokeapi.co/api/v2/type/${typeSelected}`;
      axios
        .get(URL)
        .then((res) => {
          const arr = res.data.pokemon.map((e) => e.pokemon);
          setTotalPokemonLength(arr.length);
          const arr2 = arr.slice(offset, offset + limit);
          setPokemons({ results: arr2 });
        })
        .catch((err) => console.log(err));
        
    } else {
      const URL = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
      axios
        .get(URL)
        .then((res) => setPokemons(res.data))
        .catch((err) => console.log(err));
    }
  }, [offset, pokeSearch, typeSelected]);

  let totalPokemons = pokemons?.count ? pokemons?.count : totalPokemonLength;

  const handleReset = () => {
    setPokeSearch("");
    setTypeSelected("All");
    setOffset(0);
    setLimit(20);
  };

  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/");
  }

  return (
    <section className="pokedex">
      <header className="pokedex__box pokedex__box--header">
        <div className="banner__container" onClick={handleHome}>
          <img
            src="https://i.ibb.co/f1xjrcP/image11.png"
            alt="pokemon"
            className="pokedex__img"
          />
        </div>
        <div className="box__red box__red--header"></div>
        <div className="box__black box__black--header"></div>
        <div className="box__ball box__ball--header" onClick={handleReset}>
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
            <SearchInput
              setPokeSearch={setPokeSearch}
              setTypeSelected={setTypeSelected}
              setTotalPokemonLength={setTotalPokemonLength}
            />
          </div>
          <SelectType
            setTypeSelected={setTypeSelected}
            typeSelected={typeSelected}
            setPokeSearch={setPokeSearch}
            setLimit={setLimit}
            setOffset={setOffset}
          />
        </div>
      </div>
      <div className="pokedex__cards">
        {pokemons?.results.map((pokemon) => (
          <PokemonCard
            key={pokemon.url}
            url={pokemon.url}
            totalPokemonLength={totalPokemonLength}
            limit={limit}
          />
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
