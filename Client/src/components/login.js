import React, { useState } from "react";
import Card from "./context";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const apiURL = `http://localhost:8080`;

export default function Login(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  
  return (
    <Card
      bgcolor="secondary"
      header="Login"
      status={status}
      body={show ? 
        <LoginForm setShow={setShow} setStatus={setStatus}/> :
        <LoginMsg setShow={setShow} setStatus={setStatus}/>}
    />
  ) 
}

function LoginMsg(props){  
  return(<>
    <h5>You Have Successfully logged in !!!</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => props.setShow(true)}>
        Authenticate again
    </button>
  </>);
}

function LoginForm(props){
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');
  
  
  function handle(){
    fetch(apiURL+ `/account/login/${email}/${password}`)
    .then(response => response.text())
    .then(text => {
        try {
            const data = JSON.parse(text);
            props.setStatus('');
            props.setShow(false);
                        
            localStorage.setItem('Name',data.name);  
            localStorage.setItem('Email',data.email);            
        } catch(err) {
            props.setStatus(text)
            console.log('err:', text);
        }
    }); 
      const auth  = firebase.auth();  
      
      const promise = auth.signInWithEmailAndPassword(email, password);
      promise.catch(e => console.log(e.message));
      firebase.auth().onAuthStateChanged(firebaseUser => {
        if(firebaseUser){
          firebaseUser.getIdToken().then(idToken => {
            console.log('idToken:', idToken);
            (async () => {
              let response = await fetch(apiURL+'/auth', {
                  method: 'GET',
                  headers: {
                      'Authorization': idToken
                  }
              });
              let text = await response.text();
              // routeMsg.innerHTML = text;
          })();
         }).catch(e => console.log('e:',e));
                
        }
        else{
            console.log('User is not logged in');          
        }
    });
    
  
  }
  return (<>
    Email<br/>
    <input type="input" 
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
    <button id="login" type="submit" className="btn btn-light" disabled={!email || !password}onClick={handle}>Login</button>  
  </>);
}