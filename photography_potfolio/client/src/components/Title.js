import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import "../../static/css/index.css";

const Title = () => {
  return (
    <Container>
      <Navbar bg="white" variant="light" fixed="top" className="nav-style">
        <Navbar.Brand className="title" class="font-weight-light" href="/">Kayla Dodd Photography</Navbar.Brand>
        <Container className="justify-content-end">
          <Nav>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/Gallery">Galleries</Nav.Link>
            <Nav.Link href="/About">About Me</Nav.Link>
            <Nav.Link href="/Contact">Contact</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </Container>
  );
};

export default Title;
