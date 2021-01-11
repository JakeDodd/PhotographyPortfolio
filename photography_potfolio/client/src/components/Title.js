import React, {useEffect, useState} from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import NavDropdown from "react-bootstrap/NavDropdown";
import "../../static/css/index.css";

const Title = () => {
  const [portfolioList, setPortfolioList] = useState([])

  useEffect(() => {
    loadPortfolios();
  }, []);

  const loadPortfolios = async () => {
    const portfolios = [];
    const response = await fetch('/api/portfolio');
    const data = await response.json();
    data.forEach((obj) => {
      portfolios.push(obj.portfolioName);
    })
    setPortfolioList(portfolios);
  }

  return (
    <Container>
      <Navbar bg="white" variant="light" fixed="top" className="nav-style">
        <Navbar.Brand className="title" class="font-weight-light" href="/">Kayla Dodd Photography</Navbar.Brand>
        <Container className="justify-content-end">
          <Nav>
            <Nav.Link href="/">Home</Nav.Link>
            <NavDropdown title="Galleries" id="basic-nav-dropdown">
              {portfolioList.map(portfolio => (
                <NavDropdown.Item href={"/Gallery/" + portfolio}>{portfolio}</NavDropdown.Item>
              ))}
            </NavDropdown>
            <Nav.Link href="/About">About Me</Nav.Link>
            <Nav.Link href="/Contact">Contact</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </Container>
  );
};

export default Title;
