import React, {Component} from 'react';
import Spinner from "react-bootstrap/Spinner";

class CustomSpinner extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div style={{display: "flex", height: '100vh', width: '100vw', alignItems: 'center', justifyContent: 'center'}}>
                <div>
                    <Spinner animation='border' variant={"warning"} style={{height: '25vh', width: '25vh', borderWidth: '50px'}}/>
                </div>
            </div>
        );
    }
}

export default CustomSpinner;