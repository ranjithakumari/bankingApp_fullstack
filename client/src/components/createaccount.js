import React, { useState } from "react";
import Card from "./context";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const apiURL = `http://localhost:8080`;

const firebaseConfig = {
  apiKey: "AIzaSyDC4nUrWNSR843JlF1rpNFHnPTj_Ya6kQw",
  authDomain: "capstone-bank.firebaseapp.com",
  projectId: "capstone-bank",
  storageBucket: "capstone-bank.appspot.com",
  messagingSenderId: "107634080259",
  appId: "1:107634080259:web:a7554f3db39a4a5351ec36",
  measurementId: "G-6G40XFKW41"
};

firebase.initializeApp(firebaseConfig);

export default function CreateAccount(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');

  return (
    <Card
      bgcolor="primary"
      header="Create Account"
      status={status}
      body={show ? 
        <CreateForm setShow={setShow} setStatus={setStatus}/> : 
        <CreateMsg setShow={setShow} setStatus={setStatus}/>}
    />
  )
}
function CreateMsg(props){
  return(<>
    <h5>Your Account has been created Successfully</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => props.setShow(true)}>Add another account</button>
  </>);
}

function CreateForm(props){
  const [name, setName]         = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');  

  function handle(){
    
    const auth  = firebase.auth();
  
    const promise = auth.createUserWithEmailAndPassword(email,password);
    promise.catch(e => console.log(e.message));
     
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(email) ) {
      alert("Enter a Valid Email Address");
    }
    else if (password.length < 8){
      alert("Password should contain minimum of 8 characters");
    }
    else {
      const role = 'guest';
      const url = apiURL+ `/account/create/${name}/${email}/${password}/${role}`;
      (async () => {
        var res  = await fetch(url);        
        var data = await res.json();         
        localStorage.setItem('Name',data.name);
        localStorage.setItem('Email',data.email);  
        localStorage.setItem('Role',data.role);
        props.setShow(false);
        props.setStatus('');
      })();
      
      props.setStatus('User already exists');    
    }  
  }   
  return (<>

    Name<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter name" 
      value={name} 
      onChange={e => setName(e.currentTarget.value)} /><br/>

    Email address<br/>
    <input type="email" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

    Password<br/>
    <input type="password" 
      className="form-control" 
      placeholder="Enter password" 
      value={password} 
      onChange={e => setPassword(e.currentTarget.value)}/><br/>

    <button type="submit" id="signup"
      className="btn btn-light" 
      disabled={!name || !email || !password}
      onClick={handle}>Create Account</button>
  </>);
}