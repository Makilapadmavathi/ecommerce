import logo from './logo.svg';
import './App.css';
import Signup from './Components/Signup';
import Navbarecom from './Components/Navbar';
import { useLocation, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Home from './Components/Home';
import { useReducer } from 'react';
import { createContext } from 'react';
import Viewdetail from './Components/Viewdetail';
import Cartlist from './Components/Cartlist';
import { CartProvider } from './Components/Cartcontext';
import Login from './Components/Login';
// export const CountContext= createContext();
// const initialstate=0;
// const reducer=(state,action)=>{
//   switch(action)
//   {
//     case "increment" :
//     return state + 1;
//     case "decrement":
//     return state - 1;
//     case "reset":
//       return 0;
//       default:
//         return state;
//   }

// }
function App() {
  // const [count,dispatch]=useReducer(reducer,initialstate);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('username'));
  const location=useLocation();

  return (
    // <CountContext.Provider value={{ count, dispatch }}>
    <CartProvider>
    <div>
    {location.pathname !== '/signup' && location.pathname !== '/' &&(
        <Navbarecom isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      )}
     
      <Routes>
      {/* <Route path='/' element={  <Navbarecom isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} username={username}/>}></Route> */}
    <Route path='/home' element={<Home/>}></Route>
    {/* <Route path='/category/jewelery' element={<Home/>}></Route> */}
     <Route path='/signup' element={<Signup setIsLoggedIn={setIsLoggedIn} />}></Route>
     <Route path='/' element={<Login setIsLoggedIn={setIsLoggedIn} />}></Route>
     <Route path="/viewdetail/:id" element={<Viewdetail />} />
     
     <Route path="/cartlist" element={<Cartlist />} />
      </Routes>
      
    </div>
      {/* // </CountContext.Provider> */}
      </CartProvider>
  );
}

export default App;
