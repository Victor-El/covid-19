import React, {Component} from 'react';
import Card from "react-bootstrap/Card";
import {Link} from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import formatNumber from "../util/Util";
import Button from "react-bootstrap/Button";
import Redirect from "react-router-dom/es/Redirect";
import withRouter from "react-router-dom/es/withRouter";

class CaseByCountry extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <Card style={{boxShadow: '3px 2px 3px gray'}}>
                    <Card.Header><h3>{this.props.country}</h3></Card.Header>
                    <Card.Img variant='top' src={this.props.img} style={{width: 'auto', height: '50%'}}/>
                    <Card.Body>
                        <Card.Title><Badge variant="warning">Cases</Badge> {formatNumber(this.props.cases)}</Card.Title>
                        <Card.Title><Badge variant="info">Today Cases</Badge> {formatNumber(this.props.todayCases)}
                        </Card.Title>
                        <Card.Title><Badge variant="danger">Deaths</Badge> {formatNumber(this.props.deaths)}
                        </Card.Title>
                        <Card.Title><Badge variant="info">Today Deaths</Badge> {formatNumber(this.props.todayDeaths)}
                        </Card.Title>
                        <Card.Title><Badge variant="success">Recovered</Badge> {formatNumber(this.props.recovered)}
                        </Card.Title>
                        <Card.Title><Badge variant="info">Active Cases</Badge> {formatNumber(this.props.active)}
                        </Card.Title>
                        <Card.Title><Badge variant="danger">Critical</Badge> {formatNumber(this.props.critical)}
                        </Card.Title>
                        <Card.Title><Badge variant="warning">Cases Per
                            Million</Badge> {this.props.casesPerMil > 999 ? formatNumber(this.props.casesPerMil) : this.props.casesPerMil}
                        </Card.Title>
                        <Card.Title><Badge variant="danger">Deaths Per
                            Million</Badge> {this.props.deathsPerMil > 999 ? formatNumber(this.props.deathsPerMil) : this.props.deathsPerMil}
                        </Card.Title>
                        <Button variant="secondary" style={{marginRight: '10px'}}
                                onClick={() => this.props.history.push('/analytics', [])}>Go to Analytics</Button>
                        <Link to={{
                            pathname: '/maps',
                            state: {
                                lat: this.props.lat,
                                long: this.props.long,
                                country: this.props.country
                            }
                        }}>Show in Maps</Link>
                    </Card.Body>
                </Card>
            </>
        )
    }
}

export default withRouter(CaseByCountry);
