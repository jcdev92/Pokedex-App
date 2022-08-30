import React, {useState} from 'react'

const Pagination = ({totalPokemons, offset, limit, setOffset, setPokemons, setPokeSearch}) => {

    const pageNumbers = [];
    let pokemonsPerPage = 20;

    for (let i = 1; i <= Math.ceil(totalPokemons / pokemonsPerPage); i++) {
        pageNumbers.push(i)
    }

    const segmentation = [];
    const longitudeSegmentation = 10;
    for (let i = 0; i < pageNumbers.length; i += longitudeSegmentation) {
        let segment = pageNumbers.slice(i, i + longitudeSegmentation);
        segmentation.push(segment)
    }

    const segmentationTopIndex = segmentation.length;
    const [currentSegment, setCurrentSegment] = useState(0);

    const handleClickPlus = (e) => {
        if (currentSegment < segmentationTopIndex - 1) {
            setCurrentSegment(currentSegment + 1)
        }
    }

    const handleClickMinus = (e) => {
        if (currentSegment > 0) {
            setCurrentSegment(currentSegment - 1)
        }
    }
    
    const handleOffset = (e) => {
        const pageNumber = Number(e.target.innerHTML);
        for (let i = 0; i < pageNumbers.length; i++) {
            if (pageNumbers[i] === pageNumber) {
                setOffset(offset = i * limit)
            }
        }
    }

    const firstpage = (e) => {
        setOffset(offset = 0)
        setCurrentSegment(0)
    }
    const lastpage = (e) => {
        setOffset(offset = (pageNumbers.length - 1) * limit)
        setCurrentSegment(segmentationTopIndex - 1)
    }
    
    const handleBack = (e) => {
        setPokeSearch('')
    }
    
    if (totalPokemons) {
        return (
            <ul>
              <button className={currentSegment > 0 ? "btn__firstpage": "btn__off"} onClick={firstpage}>First Page</button>
              <button className={currentSegment > 0 ? "btn__showless": "btn__off"} onClick={handleClickMinus}>...</button>
          {
              segmentation[currentSegment]?.map((segment) => (
                  <li key={segment}><button type='submit' onClick={handleOffset}>{segment}</button></li> 
                  ))
                  
          }
              <button className={currentSegment == segmentationTopIndex-1 ? "btn__off": "btn__showmore"} onClick={handleClickPlus}>...</button>
              <button className={currentSegment == segmentationTopIndex-1 ? "btn__off": "btn__lastpage"} onClick={lastpage}>Last Page</button>
          </ul>
        )

    } else {
        return (
            <ul>
                <button className="btn__back" onClick={handleBack}>Back</button>
            </ul>
        )
    }

}

export default Pagination