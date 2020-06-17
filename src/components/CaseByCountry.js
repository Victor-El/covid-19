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
                <Card style={{boxShadow: '3px 2px 3px gray', borderRadius: '10px'}}>
                    <Card.Header><h3>{this.props.country}</h3></Card.Header>
                    <Card.Img variant='top' src={this.props.img} style={{width: 'auto', height: '50%'}}/>
                    <Card.Body>
                        <Card.Text className="card-prop"><Badge variant="warning">Cases</Badge> {formatNumber(this.props.cases)}</Card.Text>
                        <Card.Text className="card-prop"><Badge variant="info">Today Cases</Badge> {formatNumber(this.props.todayCases)}
                        </Card.Text>
                        <Card.Text className="card-prop"><Badge variant="danger">Deaths</Badge> {formatNumber(this.props.deaths)}
                        </Card.Text>
                        <Card.Text className="card-prop"><Badge variant="info">Today Deaths</Badge> {formatNumber(this.props.todayDeaths)}
                        </Card.Text>
                        <Card.Text className="card-prop"><Badge variant="success">Recovered</Badge> {formatNumber(this.props.recovered)}
                        </Card.Text>
                        <Card.Text className="card-prop"><Badge variant="info">Active Cases</Badge> {formatNumber(this.props.active)}
                        </Card.Text>
                        <Card.Text className="card-prop"><Badge variant="danger">Critical</Badge> {formatNumber(this.props.critical)}
                        </Card.Text>
                        <Card.Text className="card-prop"><Badge variant="success">Tests</Badge> {formatNumber(this.props.test)}
                        </Card.Text>
                        <Card.Text className="card-prop"><Badge variant="warning">Cases Per
                            Million</Badge> {this.props.casesPerMil > 999 ? formatNumber(this.props.casesPerMil) : this.props.casesPerMil}
                        </Card.Text>
                        <Card.Text className="card-prop"><Badge variant="danger">Deaths Per
                            Million</Badge> {this.props.deathsPerMil > 999 ? formatNumber(this.props.deathsPerMil) : this.props.deathsPerMil}
                        </Card.Text>
                        <Card.Text className="card-prop"><Badge variant="success">Tests Per
                            Million</Badge> {this.props.testsPerMil > 999 ? formatNumber(this.props.testsPerMil) : this.props.testsPerMil}
                        </Card.Text>
                        <div style={{marginTop: '20px'}}>
                            <Link to={{
                                pathname: '/maps',
                                state: {
                                    lat: this.props.lat,
                                    long: this.props.long,
                                    country: this.props.country
                                }
                            }}>Show in Maps</Link>
                        </div>
                    </Card.Body>
                </Card>
            </>
        )
    }
}

export default withRouter(CaseByCountry);
