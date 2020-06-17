import React, {Component} from "react";
import withRouter from "react-router-dom/es/withRouter";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LineChart from "./LineChart";
import CustomSpinner from "./CustomSpinner";
import Form from "react-bootstrap/Form";
import DropdownComponent from "./DropdownComponent";
import {AppContext} from "../index";

const axios = require('axios').default;
const LOCAL_STORAGE_KEY = "country-cases";

class Analytics extends Component {
    constructor(props) {
        super(props);
        this.state = {loaded: false, data: [], countries: []};
    }

    componentDidMount() {
        axios.get(process.env.REACT_APP_COUNTRY_CASE_API).then((response) => {
            this.setState({data: response.data, loaded: true});
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(response.data));
            this.setState({countries: response.data.map(countryObject => countryObject.country)});
            console.log("Succeeded");
        }).catch((reason => {
            console.log(reason);
            const storedVal = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
            if (storedVal) {
                this.setState({countries: storedVal.map(countryObject => countryObject.country)});
                this.setState({loaded: true});
            }
        }));
    }

    render() {
        return (
            <>
                {this.state.loaded === false ? <CustomSpinner/> : <AppContext.Consumer>
                    {(context) => <Container style={{paddingBottom: '100px', minHeight: '100vh'}} fluid>
                        <Row>
                            <Col>
                                <h1 style={{
                                    color: process.env.REACT_APP_ACCENT_COLOR,
                                    margin: '50px 10px 0px 10px',
                                    borderRadius: '2px',
                                    fontFamily: 'san-serif',
                                    fontWeight: 'bolder',
                                    border: '2px solid gray'
                                }}>Analytics</h1>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h2>{context.state.country}</h2>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={8} xl={8} style={{margin: '0 auto'}}>
                                <DropdownComponent label="Select A Country" countries={this.state.countries.sort()}/>
                            </Col>
                        </Row>
                    </Container>}
                </AppContext.Consumer>}

            </>
        );
    }
}

export default withRouter(Analytics);
