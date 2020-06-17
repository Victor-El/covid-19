import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import {AppContext} from "../index";

class DropdownComponent extends Component {
    //static contextType = AppContext;
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <AppContext.Consumer>
                {(context) => <Form>
                    <Form.Group>
                        <Form.Label>{this.props.label}</Form.Label>
                        <Form.Control onChange={(e) => context.state.setCountry(e.target.value)} as="select" size="lg" custom>
                            {this.props.countries.map((country, index) =>
                                <option selected={country.toLowerCase() === "nigeria"} key={index}>{country}</option>
                            )}
                        </Form.Control>
                    </Form.Group>
                </Form>}
            </AppContext.Consumer>
        );
    }
}

export default DropdownComponent;
