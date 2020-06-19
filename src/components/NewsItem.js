import React, {Component} from 'react';
import {Card} from "react-bootstrap";
import {Link} from "react-router-dom";

class NewsItem extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card style={{ width: '18rem', margin: "5px", boxShadow: '3px 2px 3px gray', borderRadius: '10px' }}>
                <Card.Header>{this.props.source.name}</Card.Header>
                <Card.Img variant="top" src={this.props.image} />
                <Card.Body>
                    <Card.Title><strong>{this.props.title}</strong></Card.Title>
                    <Card.Subtitle>{this.props.description}</Card.Subtitle>
                    <Card.Link target="_blank" href={this.props.url}>Read News</Card.Link>
                </Card.Body>
                <Card.Footer><Link target="_blank" to={this.props.source.url}>Visit site</Link></Card.Footer>
            </Card>
        );
    }
}

export default NewsItem;
