import React, { useState } from "react";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

export default function Logout(){    

  firebase.auth().signOut();    
        
      return (<>
          <h5>You have Successfully logged out</h5>
          {localStorage.removeItem("Email"),localStorage.removeItem("Name"),localStorage.removeItem("Role")}           
      </>);
    
  }

