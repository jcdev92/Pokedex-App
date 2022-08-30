import React, {useState, useEffect} from 'react'
import axios from 'axios'

const SelectType = () => {
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


  return (
    <select className="searchbar__select">
            {
                listTypes?.map(type => {
                    return <option value={type.name}>{type.name}</option>
                })
            }
    </select>
  )
}

export default SelectType