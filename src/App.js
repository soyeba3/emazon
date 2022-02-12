import React, { createContext, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Shop from './components/Shop/Shop';
import { Routes, Route } from "react-router-dom";
import Review from './components/Review/Review';
import Inventory from './components/Inventory/Inventory';
import NotFound from './components/NotFound/NotFound';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Shipment from './components/Shipment/Shipment';
import Login from './components/Login/Login';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const userContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({})

  return (
    <userContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Header></Header>
        <Routes>
            <Route path='/shop' element={<Shop/>} />
            <Route path='/review' element={<Review/>} />
            <Route path='/shipment' element={<PrivateRoute><Shipment/></PrivateRoute>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/inventory' element={<PrivateRoute><Inventory/></PrivateRoute>} />
            <Route exact path='/' element={<Shop/>} />
            <Route path='/product/:productKey' element={<ProductDetail/>} />
            <Route path='*' element={<NotFound/>} />
        </Routes>
    </userContext.Provider>
  );
}

export default App;
