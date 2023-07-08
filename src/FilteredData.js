import React, {useState, useEffect} from 'react'
import data from './templates.json'
import List from './List.js'
import {Link} from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button";


function FilteredData({search}) {
    const [dashboards, setDashboards] = useState(data.filter(el => el['name'].includes(search)))
    //console.log(dashboards)

    useEffect(()=> {
      
      setDashboards(data.filter(el => el['name'].includes(search)))
    }, [dashboards])  

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
              
              <Button>
                <Link to={`/DashboardDetails/${index}`} style={{textDecoration: "none"}}>Click to add</Link>
                </Button>
              </Card.Body>
            </Card>
           
          ))}
        </>
      );
}

export default FilteredData