import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AppContext = React.createContext()

const allMealsUrls = " https://www.themealdb.com/api/json/v1/1/search.php?s="
const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php?s=a'

const AppProvider = ({ children }) => {
  const [meals, setMeals] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [selectedMeal, setSelectedMeal] = useState(null)
  const [favorites, setFavorites] = useState([])

  const addToFavorites = (idMeal) => {
    let meal;
    const alreadyFavorite = favorites.find((meal) => meal.idMeal === idMeal);
    if (alreadyFavorite) return
    meal = meals.find((meal) => meal.idMeal === idMeal);
    const updatedFavorites = [...favorites, meal];
    setFavorites(updatedFavorites)
  }
  const removeFromFavorites = (idMeal) => {
    const updatedFavorites = favorites.filter((meal) => meal.idMeal !== idMeal);
    setFavorites(updatedFavorites)
  }

  const selectMeal = (idMeal,favoriteMeal) => {
    let meal
    if(favoriteMeal){
      meal = favorites.find((meal) => meal.idMeal === idMeal)
    }else{
        meal = meals.find((meal) => meal.idMeal === idMeal)
    }
  
    setSelectedMeal(meal);
    setShowModal(true);
  }
  const closeModal = () => {
    setShowModal(false);
  }
  const fetchData = async () => {
    try {
      const response = await fetch('https://randomuser.me/api')
      const data = await response.json();
    } catch (error) {
      console.log(error)
    }
  }

  const fetchMeals = async (url) => {
    setLoading(true);
    try {
      const { data } = await axios.get(url)
      if (data.meals) {
        setMeals(data.meals)
      } else {
        setMeals([])
      }
    } catch (e) {
      console.log(e.response);
    }
    setLoading(false);
  }

  const fetchRamdomMeal = () => {
    fetchMeals(randomMealUrl)
  }
  useEffect(() => {
    //fetchData()
    fetchMeals(allMealsUrls)
  }, [])

  useEffect(() => {
    //fetchData()
    if (!searchTerm) return
    fetchMeals(`${allMealsUrls}${searchTerm}`)
  }, [searchTerm])

  return (<AppContext.Provider value={{ loading, meals, setSearchTerm, fetchRamdomMeal, showModal, selectMeal, selectedMeal, closeModal, favorites, addToFavorites, removeFromFavorites }}>{children}</AppContext.Provider>)
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }