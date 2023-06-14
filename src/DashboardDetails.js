import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import data from './templates.json'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import axios from 'axios'
import './dashboarddetails.css'


function DashboardDetails() {
  const [currentDash, setCurrentDash] = useState({})
  const [cluster, setCluster] = useState('');
  const [apiKey, setApiKey] = useState('');

    const params = useParams()
    console.log(params.id)

    const {src, ...filteredDash} = data[params.id]
    console.log(filteredDash)

    useEffect(() => {
      setCurrentDash(filteredDash)
    }, [])

  async function handleOnClick() {
    console.log(cluster)
    console.log(apiKey)
    try {
      await axios.post('http://127.0.0.1:5000/add', {
      apiKey: apiKey,
      cluster: cluster,
      currentDash: currentDash
    },
    {
      headers: {
        'Content-Type': 'application/json'
      } 
     
    }

      )}
      catch(error) {
        console.log(error)
      }
    }


  return (
<>
<Card style={{ width: '18rem' }}>
      <Card.Img variant="top" style={{width: "400px"}}src={data[params.id].src} />
      <Card.Body>
        <Card.Title>{data[params.id].name}</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  
    <Form>
        <Form.Group controlId="formCluster">
          <Form.Label>Cluster Name</Form.Label>
          <br />
          <Form.Control
            type="text"
            value={cluster}
            onChange={(event) => setCluster(event.target.value)}
            placeholder="Enter cluster name"
          />
        </Form.Group>
        <Form.Group controlId="formApi">
          <Form.Label>API Key</Form.Label>
          <br />
          <Form.Control
            type="text"
            value={apiKey}
            onChange={(event) => setApiKey(event.target.value)}
            placeholder="Enter API key"
          />
        </Form.Group>
        <Button onClick={handleOnClick}>Create Dashboard</Button>
      </Form>

</>
  )
}

export default DashboardDetails