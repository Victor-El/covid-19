import React, {Component} from 'react';
import withRouter from "react-router-dom/es/withRouter";

class News extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <h1>Covid-19 News</h1>
            </>
        );
    }
}

export default withRouter(News);
