import React, {Component} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavLink from "react-bootstrap/NavLink";
import {FaGithub, FaHeart, FaTwitterSquare, FaGithubSquare} from "react-icons/fa";
import withRouter from "react-router-dom/es/withRouter";

class FooterNav extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return(
                <Container className={this.props.history.location.pathname === '/' ? "" : "fixed-bottom"} style={{
                    padding: '0px',
                    margin: '50px 0px 0px 0px',
                    //position: this.props.history.location.pathname === '/' ? 'relative' : 'sticky',
                    //bottom: '0',
                    backgroundColor: process.env.REACT_APP_ACCENT_COLOR
                }} fluid>
                    {this.props.history.location.pathname === '/' ? <Row>
                        <Col>
                            <h5 style={{
                                backgroundColor: process.env.REACT_APP_ACCENT_COLOR,
                                color: process.env.REACT_APP_PRIMARY_COLOR,
                                fontWeight: 'bold'
                            }}>Quick Links</h5>
                        </Col>

                    </Row> : null}
                    {this.props.history.location.pathname === '/' ? <Row>
                        <Col sm={12} xs={12} xl={6} lg={6} md={6}>
                            <NavLink className='custom-nav-link' href='/news'>News</NavLink>
                        </Col>

                        <Col sm={12} xs={12} xl={6} lg={6} md={6}>
                            <NavLink className='custom-nav-link' href='/analytics'>Analytics</NavLink>
                        </Col>
                    </Row> : null}
                    {this.props.history.location.pathname === '/' ? <Row>
                        <Col sm={12} xs={12} xl={6} lg={6} md={6}>
                            <NavLink className='custom-nav-link' href='/country-cases'>Cases by Country</NavLink>
                        </Col>

                        <Col sm={12} xs={12} xl={6} lg={6} md={6}>
                            <NavLink className='custom-nav-link' href='/about'>About</NavLink>
                        </Col>
                    </Row> : null}
                    <div>
                        <NavLink className='custom-nav-link' href='https://github.com/'>
                            Open source project developed with <FaHeart style={{color: 'red'}}/>
                            and lives @ <FaGithub/> by <a href='https://github.com/Victor-El' style={{textDecoration: 'none'}}>
                            CodeEnzyme<sup>TM</sup></a> <a href="https://twitter.com/code_enzyme" style={{textDecoration: 'none'}}>
                             <br /> <FaTwitterSquare style={{height: '25px', width: '25px'}}/> </a>
                            <a href="https://github.com/Victor-El"><FaGithubSquare style={{color: 'gray', height: '25px', width: '25px'}}/></a></NavLink>
                    </div>
                </Container>
        );
    }

}

export default withRouter(FooterNav);
