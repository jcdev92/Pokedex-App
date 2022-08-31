import React from 'react'

const SearchInput = ({setPokeSearch, setTypeSelected, setTotalPokemonLength}) => {

    const handleSubmit = (e) => {
        e.preventDefault()
        setPokeSearch(e.target.searchText.value.trim().toLowerCase())
        setTypeSelected('All')
        setTotalPokemonLength(0)
        e.target.searchText.value = ""
    }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" id="searchText" placeholder="Search Pokemon" />
      <button>Search</button>
    </form>
  )
}

export default SearchInput