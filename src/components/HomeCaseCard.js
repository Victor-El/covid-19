import React, {Component} from "react";
import Card from "react-bootstrap/Card";

class HomeCaseCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <Card style={{borderColor: process.env.REACT_APP_ACCENT_COLOR, margin: '25px 10px', boxShadow: '3px 2px 3px gray'}}>
                    <Card.Body>
                        <Card.Title><h2 style={{color: '#cc9300', fontWeight: 'bold'}}>{this.props.title}</h2></Card.Title>
                        <Card.Text><h3 style={{color: process.env.REACT_APP_ACCENT_COLOR}}>{this.props.text}</h3></Card.Text>
                    </Card.Body>
                </Card>
            </>
        );
    }
}

export default HomeCaseCard;
