import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setNameTrainer } from '../store/slices/nameTrainer.slice'

const Home = () => {

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()
    const inputValue = e.target.name.value.trim()

    if(inputValue.length !== 0) {
      dispatch(setNameTrainer(inputValue))
      navigate('/pokedex')
    }
    e.target.name.value = ""
  }

  return (
    <section className="home">
      <img src="src/assets/image11.png" alt="pokemon" /> 
      <div className="home__card">
        <h1>Welcome Trainer!</h1>
        <p>To Start give me your trainer name</p>
      </div>
      <form className="home__form" onSubmit={handleSubmit}>
        <input id='name' type="text" />
        <button>Catch them all</button>
      </form>
    </section>
  )
}

export default Home