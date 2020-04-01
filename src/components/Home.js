import React, {Component, useState} from "react";
import {Button, Col, Container, Row, Spinner} from "react-bootstrap";
import HomeCaseCard from "./HomeCaseCard";
import formatNumber from "../util/Util";
import CustomSpinner from "./CustomSpinner";
import withRouter from "react-router-dom/es/withRouter";
import PieChart from "./PieChart";

const axios = require('axios').default;

const LOCAL_STORAGE_GLOBAL_CASE_KEY = "global-cases";

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {loaded: false, cases: 0, deaths: 0, recovered: 0, active: 0};
    }

    componentDidMount() {
        axios.get(process.env.REACT_APP_API_URL).then((response) => {
            console.log(response);
            if (response.status === 200) {
                this.setState({
                    loaded: true,
                    cases: response.data.cases,
                    deaths: response.data.deaths,
                    recovered: response.data.recovered,
                    active: response.data.active
                });
                this.animateValue(this.state.cases - 100, this.state.cases, 2000);
                this.animateValueDeaths(this.state.deaths - 100, this.state.deaths, 2000);
                this.animateValueRecovered(this.state.recovered - 100, this.state.recovered, 2000);
                this.animateValueActive(this.state.active - 100, this.state.active, 2000);

                localStorage.setItem(LOCAL_STORAGE_GLOBAL_CASE_KEY, JSON.stringify(response.data));
            }
        }).catch((error) => {
            console.log(error);
            this.setState({loaded: true});
            let values = JSON.parse(localStorage.getItem(LOCAL_STORAGE_GLOBAL_CASE_KEY));
            if (values) {
                this.setState({cases: values.cases, deaths: values.deaths, recovered: values.recovered});
            }

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
                            <Col sm={12} xs={12} md={10} xl={10} lg={8} style={{margin: '0 auto'}}>
                                <PieChart colors={['#ffd700', '#cc1122', 'cyan']}
                                          labels={['Active Cases', 'Deaths', 'Recovery']}
                                          data={[this.state.active, this.state.deaths, this.state.recovered]}
                                          title={`COVID-19 CASES: ${formatNumber(this.state.cases)}`} type={"doughnut"}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={6} xl={6} md={6}>
                                <HomeCaseCard title='Cases' text={formatNumber(this.state.cases)}/>
                            </Col>
                            <Col lg={6} xl={6} md={6}>
                                <HomeCaseCard title='Deaths' text={formatNumber(this.state.deaths)}/>
                            </Col>
                            <Col lg={6} xl={6} md={6}>
                                <HomeCaseCard title='Recovered' text={formatNumber(this.state.recovered)}/>
                            </Col>
                            <Col lg={6} xl={6} md={6}>
                                <HomeCaseCard title='Active Cases' text={formatNumber(this.state.active)}/>
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
}

export default withRouter(Home);
