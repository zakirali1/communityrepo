import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container'
import './banner.css'
import { Link } from 'react-router-dom'
import Dashboard from './Dashboard.js'


function Banner() {
  return (
    <Container className="navigator">
    <Navbar expand="lg" variant="light" bg="light">
      <Container>
      <Link to={'/'}>
        <Navbar.Brand href="#"><img className="vmw" src="/images/VMware-logo.png"/></Navbar.Brand>
    </Link>
      </Container>
    </Navbar>
  </Container>
  )
}

export default Banner