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
      <div className="home__card">
        <img src="https://i.ibb.co/f1xjrcP/image11.png" alt="pokemon" /> 
        <h1>Welcome Trainer!</h1>
        <p>To Start give me your trainer name</p>
      <form className="home__form" onSubmit={handleSubmit}>
        <input id='name' type="text" />
        <button>Catch them all</button>
      </form>
      </div>
      <footer className="home__box">
        <div className="box__red"></div>
        <div className="box__black"></div>
        <div className="box__ball">
          <div className="box__ball in"></div>
        </div>
      </footer>
    </section>
  )
}

export default Home