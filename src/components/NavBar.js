import React, {Component} from 'react';
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import NavDropdown from "react-bootstrap/NavDropdown";
import {Link} from "react-router-dom";
import withRouter from "react-router-dom/es/withRouter";
import {AppContext} from "../index";

import logo from "../assets/logo512.png";

class NavBar extends Component {

    constructor(props) {
        super(props);
    }

    /*componentDidMount() {
        this.contextType = AppContext;
    }*/

    filter(e) {
        console.log(this.context.countryList);
    }

    render() {
        return (
            <>
                <AppContext.Consumer>
                    {(context) => <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky='top'>
                        <Navbar.Brand style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center"
                        }} href="#home">
                            <img
                                alt=""
                                src={logo}
                                style={{margin: "3px"}}
                                width="50"
                                height="50"
                                className="d-inline-block align-top"
                            />
                            <Link to='/'><h2
                            style={{color: '#ffd700', fontWeight: 'bolder'}}>COVID-19</h2></Link></Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link href="/home">Home</Nav.Link>
                                <Nav.Link href="/news">News</Nav.Link>
                                <Nav.Link href="/country-cases">Cases by Country</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                        {this.props.history.location.pathname === '/country-cases' ?
                            <Form inline>
                                <FormControl type="text" placeholder="Search for countries" className="mr-sm-2"
                                             onChange={(e) => context.state.setCountry(e.target.value)}/>
                            </Form>
                            : null}
                    </Navbar>}
                </AppContext.Consumer>
            </>
        );
    }
}

export default withRouter(NavBar);
