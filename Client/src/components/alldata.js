import React from "react";
export default function AllData(){    

    const email = localStorage.getItem("Email");
     
    const [data, setData] = React.useState(''); 
    const [balance, setBalance] = React.useState('');
    const [name, setName] = React.useState('');

        React.useEffect(() => {          
            // fetch all accounts from API
            fetch('http://localhost:8080/account/all')
                .then(response => response.text())
                .then(text => { 
                    const data = JSON.parse(text);                        
                        data.forEach(item => {                            
                            if (item['email'] == email && item['role'] == 'guest'){                                   
                                setBalance(JSON.stringify(item.balance));   
                                setName(JSON.stringify(item.name));                         
                            }        
                            else if(item['email'] == email && item['role'] == 'Admin'){                                                      
                                setData(JSON.stringify(data));                         
                            }                                      
                        });
                      
                });
        }, []);          
          
        if(data){
            return (<>        
                <h5>Details</h5>                
                <h6>{data}</h6>           
            </>);
        }
        else{
            return (<>
                <h4>Details</h4>
                <table rules="all" width="600" border="2">  
                    <thead style={{"borderWidth":"2px", 'borderColor':"black", 'borderStyle':'solid'}}>
                        <tr align="center">
                            <th>Name</th>
                            <th>Email</th>
                            <th>Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr align="center">
                            <td>{name}</td>
                            <td>{email}</td>
                            <td>{balance}</td>
                        </tr>
                    </tbody> 
                </table>                     
            </>);
        }
        
      
    }
  
  
  
    