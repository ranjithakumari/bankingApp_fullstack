import React, { useState } from "react";
import Card from "./context";
import Bank from "./bank.png";

export default function Home(){
  return (
    <Card
      txtcolor="black"    
      bgcolor = "primary"  
      header="Bharat Bank"
      title="Welcome to the bank"
      body={(<img src={Bank} width="500rem" className="img-fluid" alt="Responsive image"/>)}
    />
    
  );  
}

