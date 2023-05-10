import React from 'react'
import Button from 'react-bootstrap/Button';
import axios from 'axios'

function Test() {

   async function handleOnClick() {
    try {
        const response = await axios.get("http://localhost:3001/user", {

        })
        console.log(response)
        }
    
    catch(error) {
        console.log(error)
    }
}
 
   

  return (
    <div>
<Button onClick={handleOnClick}>Click me</Button>
    </div>
  )
}

export default Test