import React, {useState, useEffect} from 'react'
import axios from 'axios'

const SelectType = ({setTypeSelected}) => {
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
    }

  return (
    <select className="searchbar__select" onChange={handleChange}>
            {
                listTypes?.map(type => {
                    return <option value={type.name}>{type.name}</option>
                })
            }
    </select>
  )
}

export default SelectType