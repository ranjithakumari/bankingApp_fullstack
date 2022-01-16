import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, HashRouter } from "react-router-dom";


// We import all the components we need in our app
import NavBar from "./components/navbar";
import AllData from "./components/alldata";
import CreateAccount from "./components/createaccount";
import Card from "./components/context";
import Deposit from "./components/deposit";
import Home from "./components/home";
import Login from "./components/login";
import Logout from "./components/logout";
import Withdraw from "./components/withdraw";
import Bank from "./components/bank.png";
const UserContext = React.createContext(null);

const apiURL = `http://localhost:8080`;

const App = () => {
  
    return (
      <HashRouter>
        <div>
          <NavBar/>        
          <UserContext.Provider value={{users:[{name:'abel',email:'abel@mit.edu',password:'secret',balance:100, role:'Admin'}]}}>
            <div className="container" style={{padding: "20px"}}>
            <Routes>
              <Route path="/" exact element={<Home/>} />
              <Route path="/createaccount" element={<CreateAccount/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/deposit" element={<Deposit/>} />
              <Route path="/withdraw" element={<Withdraw/>} />             
              <Route path="/logout" element={<Logout/>} />
              <Route path="/alldata" element={<AllData/>} />          
              </Routes>
            </div>
          </UserContext.Provider>
        </div>
      </HashRouter>
    );
  
}
export default App;


