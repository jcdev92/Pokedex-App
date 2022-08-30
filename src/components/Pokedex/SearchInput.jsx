import React from 'react'

const SearchInput = ({setPokeSearch}) => {

    const handleSubmit = (e) => {
      e.preventDefault()
      setPokeSearch(e.target.searchText.value.trim().toLowerCase())
    }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" id="searchText" placeholder="Search Pokemon" />
      <button>Search</button>
    </form>
  )
}

export default SearchInput