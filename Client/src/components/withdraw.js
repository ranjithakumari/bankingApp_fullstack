import React, { useState } from "react";
import Card from "./context";
const apiURL = `http://localhost:8080`;
export default function Withdraw(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  
  
  return (
    <Card
      bgcolor="success"
      header="Withdraw"
      status={status}
      body={show ? 
        <WithdrawForm setShow={setShow} setStatus={setStatus}/> :
        <WithdrawMsg setShow={setShow} setStatus={setStatus}/>}
    />
  )
}

function WithdrawMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => {
        props.setShow(true);
        props.setStatus('');
      }}>
        Withdraw again
    </button>
  </>);
}

function WithdrawForm(props){
  const [amount, setAmount] = React.useState('');  
  const [balance, setBalance] = React.useState('');
  const email = localStorage.getItem("Email");
  React.useEffect(() => {          
    // fetch all accounts from API
    fetch(apiURL+`/account/findone/${email}`)
  .then(response => response.text())
  .then(text => 
    {       
          const data = JSON.parse(text);
          setBalance(data.balance);
                 
  });
}, []);          

  function handle(){
    if (amount>balance){
      alert('Insufficient Balance');            
    }  
    else if(amount<0){
      alert("Enter a positive value");
    }   
    
    else{
      fetch(apiURL+`/account/update/${email}/-${amount}`)
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
                       
          } catch(err) {
              props.setStatus('Withdraw failed')
              console.log('err:', text);
          }
      });
    }
    
  }
  return(<>
    Amount<br/>
    <input type="number" 
      className="form-control" 
      placeholder="Enter amount" 
      value={amount} 
      onChange={e => setAmount(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>
        Withdraw
    </button>

  </>);
}
