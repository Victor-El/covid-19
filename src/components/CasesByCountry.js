import React, {Component} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CaseByCountry from "./CaseByCountry";
import Spinner from "react-bootstrap/Spinner";
import CustomSpinner from "./CustomSpinner";
import {AppContext} from '../index';

const axios = require('axios').default;
const LOCAL_STORAGE_KEY = "country-cases";

class CasesByCountry extends Component {
    constructor(props) {
        super(props);

        this.state = {listOfCountries: [], country: ""};
    }

    componentDidMount() {
        axios.get(process.env.REACT_APP_COUNTRY_CASE_API).then((response) => {
            console.log(response);
            if (response.status === 200) {
                console.log("Success");
                this.setState({listOfCountries: response.data});
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(response.data));
                console.log(this.state.listOfCountries);
            }
        }).catch((error) => {
            console.log(error);
            if (localStorage.getItem(LOCAL_STORAGE_KEY)) {
                this.setState({listOfCountries: JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))});
            }
        });
    }

    render() {
        return (
            this.state.listOfCountries.length < 1 ? <CustomSpinner/> : <>
                <AppContext.Consumer>
                    {(context) => <Container fluid>
                        <Row>
                            <Col>
                                <h1 style={{
                                    color: process.env.REACT_APP_ACCENT_COLOR,
                                    fontFamily: 'san-serif',
                                    margin: '10px',
                                    fontWeight: 'bolder',
                                    border: '2px solid gray',
                                    borderRadius: '2px'
                                }}>Cases by Country</h1>
                            </Col>
                        </Row>
                        <Row>
                            {this.state.listOfCountries.filter((list) => list.country.toLowerCase().includes(context.state.country.toLowerCase())).map((value, index) =>
                                <Col key={index} md={6} lg={4} xl={4} style={{marginBottom: '25px'}}>
                                    <CaseByCountry country={value.country}
                                                   img={value.countryInfo.flag}
                                                   cases={value.cases}
                                                   todayCases={value.todayCases}
                                                   deaths={value.deaths}
                                                   todayDeaths={value.todayDeaths}
                                                   recovered={value.recovered}
                                                   active={value.active}
                                                   critical={value.critical}
                                                   casesPerMil={value.casesPerOneMillion}
                                                   deathsPerMil={value.deathsPerOneMillion}
                                                   lat={value.countryInfo.lat}
                                                   long={value.countryInfo.long}/>
                                </Col>)}
                        </Row>
                    </Container>}
                </AppContext.Consumer>
            </>
        );
    }
}

export default CasesByCountry;
