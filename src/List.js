import React, { useState, useEffect } from "react";
import data from "./templates.json";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./list.css";
import {Link} from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function List() {
  const [dashboards, setDashboards] = useState(data);
  const [selectedDash, setSelectedDash] = useState(null);

 console.log(selectedDash)

 
 function handleDashBoardClick(dashboard, index) {
    const {src, ...newDashboard} = dashboard;
    setSelectedDash(newDashboard);
    console.log(selectedDash);
    
    
  }



  return (
    <>
      {dashboards.map((dashboard, index) => ( // Changed map function syntax

        <Card key={index} className="lists" style={{ width: "18rem" }}>
          <Link to={`/DashboardDetails/${index}`}>
          <Card.Img
            style={{ width: "200px" }}
            variant="top"
            src={dashboard.src}
            alt="img"
          />
          </Link>
          <Card.Body>
            <Card.Title>{dashboard.name}</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
          
            <Button
              variant="primary"
              onClick={() => handleDashBoardClick(dashboard, index)} // Pass the clicked dashboard to setSelectedDash
            >
             <Link to={`/DashboardDetails/${index}`} style={{textDecoration: "none"}}>Click to add</Link>
            </Button>
          </Card.Body>
        </Card>
       
      ))}
    </>
  );
}

export default List;