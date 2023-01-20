import './App.css'
import React,{useContext} from 'react';
import Favorites from './components/Favorites'
import Meals from './components/Meals';
import Modal from './components/Modal';
import Search from './components/Search';


export default function App() {
  return (
    <main>
      {/*<Search /> */}
      {/*<Favorites /> */}
      <Meals />
      {/*<Modal />*/}
    </main>
  )
}
