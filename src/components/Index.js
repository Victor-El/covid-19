import React, {Component} from "react";
import withRouter from "react-router-dom/es/withRouter";

class Index extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <>
                <h1>Index Page</h1>
            </>
        );
    }
}

export default withRouter(Index);
