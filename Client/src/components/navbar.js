import React, { useState } from "react";


export default function NavBar(){   
  const [user, setUser] = React.useState();  
  React.useEffect(() => {
  setInterval(() => {
    const user = localStorage.getItem("Name");
    setUser(user);
  },500)
  },[]);

  const logout = () => {
    return localStorage.removeItem("user");
}
if(!user){
return(
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">Home</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="#/CreateAccount/">Create Account</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/login/">Login</a>
          </li>
        </ul>            
      </div>    
         
    </nav>
  );
}
if(user){
  return(
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">Bharat Bank</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="#/CreateAccount/">Create Account</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/login/">Login</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/deposit/">Deposit</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/withdraw/">Withdraw</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/alldata/">Balance</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/logout/">Logout</a>
          </li>   
          
        </ul>            
      </div>    
      <div>
        <ul className="navbar-nav">
        <li className="nav-item">          
            <label>{user}</label>
          </li>         
          
        </ul>
          
        </div>  
      
    </nav>
  );
}}
