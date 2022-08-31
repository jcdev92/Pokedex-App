import React from 'react'

const SearchInput = ({setPokeSearch, setTypeSelected}) => {

    const handleSubmit = (e) => {
        e.preventDefault()
        setPokeSearch(e.target.searchText.value.trim().toLowerCase())
        setTypeSelected('All')
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