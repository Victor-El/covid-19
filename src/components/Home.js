import React, {Component, useState} from "react";
import {Button, Col, Container, Row, Spinner} from "react-bootstrap";
import HomeCaseCard from "./HomeCaseCard";
import formatNumber from "../util/Util";
import CustomSpinner from "./CustomSpinner";
import withRouter from "react-router-dom/es/withRouter";
import PieChart from "./PieChart";

const axios = require('axios').default;

const LOCAL_STORAGE_GLOBAL_CASE_KEY = "global-cases";
const LOOCAL_STORAGE_GLOBAL_CASE_MISC_KEY = "global-case-misc";

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded: false,
            cases: 0,
            deaths: 0,
            recovered: 0,
            active: 0,
            tests: 0,
            affectedCountries: 0,
            casesPerOneMillion: 0,
            deathsPerOneMillion: 0,
            testsPerOneMillion: 0
        };
    }

    componentDidMount() {
        axios.get(process.env.REACT_APP_API_URL).then((response) => {
            console.log(response);
            if (response.status === 200) {
                this.setState({
                    cases: response.data.cases,
                    deaths: response.data.deaths,
                    recovered: response.data.recovered,
                    active: response.data.active,
                    tests: response.data.tests,
                    affectedCountries: response.data.affectedCountries,
                    casesPerOneMillion: response.data.casesPerOneMillion,
                    deathsPerOneMillion: response.data.deathsPerOneMillion,
                    testsPerOneMillion: response.data.testsPerOneMillion,
                    loaded: true
                });
                this.animateValue(this.state.cases - 100, this.state.cases, 2000);
                this.animateValueDeaths(this.state.deaths - 100, this.state.deaths, 2000);
                this.animateValueRecovered(this.state.recovered - 100, this.state.recovered, 2000);
                this.animateValueActive(this.state.active - 100, this.state.active, 2000);
                this.animateValueCritical(this.state.critical - 100, this.state.critical, 2000);
                this.animateValueTodayDeaths(this.state.todayDeaths - 100, this.state.todayDeaths, 2000);
                this.animateValueTodayCases(this.state.todayCases - 100, this.state.todayCases, 2000);
                this.animateValueTests(this.state.tests - 100, this.state.tests, 2000);
                this.animateValueAffectedCountries(this.state.affectedCountries - 100, this.state.affectedCountries, 2000);

                localStorage.setItem(LOCAL_STORAGE_GLOBAL_CASE_KEY, JSON.stringify(response.data));
            }
        }).catch((error) => {
            console.log(error);
            let values = JSON.parse(localStorage.getItem(LOCAL_STORAGE_GLOBAL_CASE_KEY));
            if (values) {
                this.setState({
                    cases: values.cases,
                    deaths: values.deaths,
                    recovered: values.recovered,
                    active: values.active,
                    tests: values.tests,
                    affectedCountries: values.affectedCountries,
                    casesPerOneMillion: values.casesPerOneMillion,
                    deathsPerOneMillion: values.deathsPerOneMillion,
                    testsPerOneMillion: values.testsPerOneMillion
                });
            }
            this.setState({loaded: true});

        });
    }

    render() {
        return (
            <>
                {this.state.loaded === false ? <CustomSpinner/> :
                    <Container style={{paddingBottom: '100px', minHeight: '100vh'}} fluid>
                        <Row>
                            <Col>
                                <h1 style={{
                                    color: process.env.REACT_APP_ACCENT_COLOR,
                                    margin: '50px 10px 0px 10px',
                                    borderRadius: '2px',
                                    fontFamily: 'san-serif',
                                    fontWeight: 'bolder',
                                    border: '2px solid gray'
                                }}>Global Stats</h1>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h3>Countries Affected: {this.state.affectedCountries}</h3>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={12} xs={12} md={6} xl={8} lg={10} style={{margin: '0 auto'}}>
                                <PieChart colors={['#ffd700', '#cc1122', 'cyan']}
                                          labels={['Active Cases', 'Deaths', 'Recovery']}
                                          data={[this.state.active, this.state.deaths, this.state.recovered]}
                                          title={`COVID-19 CASES: ${formatNumber(this.state.cases)}`}
                                          type={"doughnut"}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={12} xs={12} md={6} xl={6} lg={6} style={{margin: '0 auto'}}>
                                <PieChart colors={['#ffd700', 'cyan']}
                                          labels={['Tested Positive', 'Tested Negative']}
                                          data={[this.state.cases, this.state.tests - this.state.cases]}
                                          title={`COVID-19 TEST CASES: ${formatNumber(this.state.tests)}`}
                                          type={"doughnut"}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={12} xs={12} md={6} xl={6} lg={6} style={{margin: '0 auto'}}>
                                <PieChart colors={['#ffd700', 'cyan'].reverse()}
                                          labels={['A Million People', 'Cases Per Million']}
                                          data={[1000000 - this.state.casesPerOneMillion, this.state.casesPerOneMillion]}
                                          title={`COVID-19 CASES PER MILLION: ${formatNumber(1000000)}`}
                                          type={"doughnut"}/>
                            </Col>
                            <Col sm={12} xs={12} md={6} xl={6} lg={6} style={{margin: '0 auto'}}>
                                <PieChart colors={['cyan', '#cc1122'].reverse()}
                                          labels={['A Million People', 'Deaths Per Million']}
                                          data={[1000000 - this.state.deathsPerOneMillion, this.state.deathsPerOneMillion]}
                                          title={`COVID-19 DEATHS PER MILLION: ${formatNumber(1000000)}`}
                                          type={"doughnut"}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={12} xs={12} md={6} xl={6} lg={6} style={{margin: '0 auto'}}>
                                <PieChart colors={['cyan', 'green']}
                                          labels={['Remainder of A Million People', 'Tests Per Million']}
                                          data={[1000000 - this.state.testsPerOneMillion, this.state.testsPerOneMillion]}
                                          title={`COVID-19 TESTS PER MILLION: ${formatNumber(1000000)}`}
                                          type={"doughnut"}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={6} xl={6} md={6}>
                                <HomeCaseCard title='Cases' val={this.state.cases} totalCases={this.state.cases}
                                              text={formatNumber(this.state.cases)}/>
                            </Col>
                            <Col lg={6} xl={6} md={6}>
                                <HomeCaseCard title='Deaths' val={this.state.deaths} totalCases={this.state.cases}
                                              text={formatNumber(this.state.deaths)}/>
                            </Col>
                            <Col lg={6} xl={6} md={6}>
                                <HomeCaseCard title='Recovered' val={this.state.recovered} totalCases={this.state.cases}
                                              text={formatNumber(this.state.recovered)}/>
                            </Col>
                            <Col lg={6} xl={6} md={6}>
                                <HomeCaseCard title='Active Cases' val={this.state.active} totalCases={this.state.cases}
                                              text={formatNumber(this.state.active)}/>
                            </Col>
                            <Col lg={6} xl={6} md={6}>
                                <HomeCaseCard title="Tests" val={this.state.tests}
                                              totalCases={this.state.cases}
                                              text={formatNumber(this.state.tests)}/>
                            </Col>
                        </Row>
                    </Container>}
            </>
        );
    }

    animateValue(start, end, duration) {
        let range = end - start;
        let current = start;
        let increment = end > start ? 1 : -1;
        let stepTime = Math.abs(Math.floor(duration / range));
        let timer = setInterval(() => {
            current += increment;
            this.setState({cases: current});
            if (current === end) {
                clearInterval(timer);
            }
        }, stepTime);
    }

    animateValueDeaths(start, end, duration) {
        let range = end - start;
        let current = start;
        let increment = end > start ? 1 : -1;
        let stepTime = Math.abs(Math.floor(duration / range));
        let timer = setInterval(() => {
            current += increment;
            this.setState({deaths: current});
            if (current === end) {
                clearInterval(timer);
            }
        }, stepTime);
    }

    animateValueRecovered(start, end, duration) {
        let range = end - start;
        let current = start;
        let increment = end > start ? 1 : -1;
        let stepTime = Math.abs(Math.floor(duration / range));
        let timer = setInterval(() => {
            current += increment;
            this.setState({recovered: current});
            if (current === end) {
                clearInterval(timer);
            }
        }, stepTime);
    }

    animateValueActive(start, end, duration) {
        let range = end - start;
        let current = start;
        let increment = end > start ? 1 : -1;
        let stepTime = Math.abs(Math.floor(duration / range));
        let timer = setInterval(() => {
            current += increment;
            this.setState({active: current});
            if (current === end) {
                clearInterval(timer);
            }
        }, stepTime);
    }

    animateValueCritical(start, end, duration) {
        let range = end - start;
        let current = start;
        let increment = end > start ? 1 : -1;
        let stepTime = Math.abs(Math.floor(duration / range));
        let timer = setInterval(() => {
            current += increment;
            this.setState({critical: current});
            if (current === end) {
                clearInterval(timer);
            }
        }, stepTime);
    }

    animateValueTodayDeaths(start, end, duration) {
        let range = end - start;
        let current = start;
        let increment = end > start ? 1 : -1;
        let stepTime = Math.abs(Math.floor(duration / range));
        let timer = setInterval(() => {
            current += increment;
            this.setState({todayDeaths: current});
            if (current === end) {
                clearInterval(timer);
            }
        }, stepTime);
    }

    animateValueTodayCases(start, end, duration) {
        let range = end - start;
        let current = start;
        let increment = end > start ? 1 : -1;
        let stepTime = Math.abs(Math.floor(duration / range));
        let timer = setInterval(() => {
            current += increment;
            this.setState({todayCases: current});
            if (current === end) {
                clearInterval(timer);
            }
        }, stepTime);
    }

    animateValueTests(start, end, duration) {
        let range = end - start;
        let current = start;
        let increment = end > start ? 1 : -1;
        let stepTime = Math.abs(Math.floor(duration / range));
        let timer = setInterval(() => {
            current += increment;
            this.setState({tests: current});
            if (current === end) {
                clearInterval(timer);
            }
        }, stepTime);
    }

    animateValueAffectedCountries(start, end, duration) {
        let range = end - start;
        let current = start;
        let increment = end > start ? 1 : -1;
        let stepTime = Math.abs(Math.floor(duration / range));
        let timer = setInterval(() => {
            current += increment;
            this.setState({affectedCountries: current});
            if (current === end) {
                clearInterval(timer);
            }
        }, stepTime);
    }
}

export default withRouter(Home);
