import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container';
import List from './List.js'
import './dashboard.css';
import TextField from "@mui/material/TextField";
import data from './templates.json'
import Card from 'react-bootstrap/Card';
import Filtered from './FilteredData.js'


function Dashboard() {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [chartName, setChartName] = useState('');
  const [queryName, setQueryName] = useState('');
  const [query, setQuery] = useState('');
  const [inputText, setInputText] = useState('')

  async function handleOnClick() {
    console.log('clicked react button');
    try {
      const response = await axios.post(
        'http://127.0.0.1:5000/create_dashboard',
        {
          id: id,
          name: name,
          sections: [
            {
              name: 'section1',
              rows: [
                {
                  charts: [
                    {
                      name: chartName,
                      sources: [
                        {
                          name: queryName,
                          query: query,
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
          url: url,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }

function inputHandler(e) {
console.log(e.currentTarget.value.toLowerCase())
setInputText(e.currentTarget.value)


  }

  return (
    <>
     
      <div className="jumbotron" style={{ backgroundColor: 'transparent', color: 'black'}}>
  <h1 className="display-4 header-1" style={{fontSize: "3.5rem"}}>Community Repository</h1>
  <p className="lead" style={{fontSize: "3rem"}}>Welcome!</p>
  <hr className="my-4" />
  <p><strong>From nodecharts to heatmaps, cost analysis to in-depth visualisations any way you want. Pick your favourite!</strong></p>
</div>

<div className="search">
<TextField
          id="outlined-basic"
          variant="outlined"
          fullWidth
          label="Search"
          onChange={inputHandler}
        />
        </div>

      <Container className="wrapper-card" fluid>
            
      <Row>
        
        {inputText ? (
            <Filtered search={inputText} />
            ) : (
              <List />
        )}
      


        
         
  
  </Row>
      
  </Container>
  
      
    </>
  );
}

export default Dashboard;