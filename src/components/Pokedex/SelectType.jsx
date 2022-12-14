import React, {useState, useEffect} from 'react'
import axios from 'axios'

const SelectType = ({setTypeSelected, typeSelected, setPokeSearch, setLimit, setOffset}) => {
    const [listTypes, setListTypes] = useState([])
    useEffect(() => {
        axios.get('https://pokeapi.co/api/v2/type')
            .then(res => {
                setListTypes(res.data.results)
            }).catch(err => {
                console.log(err)
            }
        )
    }, [])

    const handleChange = e => {
        setTypeSelected(e.target.value)
        setPokeSearch('')
        setOffset(0)
        setLimit(20)
    }

  return (
    <select value={typeSelected} className="searchbar__select" onChange={handleChange}>
        <option value="All">All</option>
            {
                listTypes?.map(type => {
                    return <option value={type.name}>{type.name}</option>
                })
            }
    </select>
  )
}

export default SelectType