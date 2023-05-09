import React, {useState, useEffect} from 'react'
import data from './templates.json';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

function Dashboard() {
    console.log(data)

    async function handleOnClick(){
        console.log("clicked react button")
        try {

            const response = await axios.get("http://127.0.0.1:5000/create_dashboard", {
                header: {
                    "Content-Type: application/json"
                },
                
                withCredentials: true
})
               
            
            console.log(response)
        }
            catch(err) {
                console.log(err)
    }
    }
        
  return (
      <>
      <div>Dashboard</div>
      <Button onClick={handleOnClick}>Hello</Button>
      </>
  )
}

export default Dashboard;