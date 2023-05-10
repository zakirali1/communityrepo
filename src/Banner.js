import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container'
import './banner.css'


function Banner() {
  return (
    <Container className="navigator">
    <Navbar expand="lg" variant="light" bg="light">
      <Container>
        <Navbar.Brand href="#"><img className="vmw" src="/images/VMware-logo.png"/></Navbar.Brand>
      </Container>
    </Navbar>
  </Container>
  )
}

export default Banner