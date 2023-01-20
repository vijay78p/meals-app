import React, { useContext, useEffect } from 'react';
import axios from 'axios';

const AppContext = React.createContext()

const allMealsUrls = " https://www.themealdb.com/api/json/v1/1/search.php?s=a"
const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php'

const AppProvider = ({ children }) => {

  const fetchData = async () => {
    try {
      const response = await fetch('https://randomuser.me/api')
      const data = await response.json();
      console.log(data)

    } catch (error) {
      console.log(error)
    }
  }

  const fetchMeals = async(url) => {
    try{
      const response = await axios.get(url)
      console.log(response.data.meals)
    }catch(e) {
      console.log(e);
    }
  }
  useEffect(() => {
    fetchData()
    fetchMeals(randomMealUrl)
  }, [])

  return <AppContext.Provider value={{ name: 'john' }}>{children}</AppContext.Provider>
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }