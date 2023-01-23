import React, { useState } from 'react'
import { useGlobalContext } from '../Context';
const Search = () => {
  const [text, setText] = useState('')
  const { setSearchTerm, fetchRamdomMeal } = useGlobalContext()

  const handleChange = (e) => { setText(e.target.value) }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (text) {
      setSearchTerm(text);
    }
  }

  const handleRandomMeal = () => {
    setSearchTerm('');
    setText('')
    fetchRamdomMeal()
  }
  return (
    <header className='search-container'>
      <form onSubmit={handleSubmit}>
        <input type='text' value={text} onChange={handleChange} placeholder='type favorite meal' className='form-input' />
        <button type="submit" className='btn'>Search</button>
        <button type="button" className='btn btn-hipster' onClick={handleRandomMeal} >Surprise me!</button>
      </form>
    </header>
  )


}

export default Search