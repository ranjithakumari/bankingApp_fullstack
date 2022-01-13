import React, { useState } from "react";
import Card from "./context";
const apiURL = `http://localhost:8080`;

export default function Deposit(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  

  return (
    <Card
      bgcolor="warning"
      header="Deposit"
      status={status}
      body={show ? 
        <DepositForm setShow={setShow} setStatus={setStatus}/> :
        <DepositMsg setShow={setShow} setStatus={setStatus}/>}
    />
  )
}

function DepositMsg(props){
  
  return (<>
    <h5>Success</h5>   
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => {
          props.setShow(true);
          props.setStatus('');
      }}>
        Deposit again
    </button>
  </>);
} 

function DepositForm(props){
  const [email, setEmail]   = React.useState('');
  const [amount, setAmount] = React.useState('');
  
  function handle(){
    const email = localStorage.getItem("Email");    
    setEmail(email);    
    if (amount>0) {
      fetch(apiURL+`/account/update/${email}/${amount}`)
      .then(response => response.text())
      .then(text => {    
        try {          
            const data = JSON.parse(text);            
            props.setStatus('');
            props.setShow(false);  
            fetch(apiURL+`/account/findone/${email}`)
            .then(response => response.text())
            .then(text => {      
            const data = JSON.parse(text);      
            alert('Your Current Balance is:'+ data.balance);   });        
        }             
        catch(err) {
          props.setStatus('Deposit failed')
          console.log('err:', text);
        }
    });   
    }
    else
    alert("Please Enter Positive Value");
  }
  return(<>        
    Amount<br/>
    <input type="number" 
      className="form-control" 
      placeholder="Enter amount" 
      value={amount} onChange={e => setAmount(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>Deposit</button>

  </>);
}