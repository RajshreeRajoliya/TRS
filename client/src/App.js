import React from 'react'
import Header from './Component/Header';
import { Routes , Route  } from 'react-router-dom';
import Auth from './Component/Auth';
import Buspage from './Component/Buspage';
import Cart from './Component/Cart'

function App() {
  return (
    <React.Fragment>
 
    <header>
    <Header/>
    </header>

    <main>
    <Routes>
    <Route path = "/auth" element = {<Auth/>}/>
    <Route path = "/home" element = {<Buspage/>}/>
    <Route path = "/cartpage" element = {<Cart/>}/>
    </Routes>
    </main>

    </React.Fragment>
  );
}

export default App;


