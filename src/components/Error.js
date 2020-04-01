import React, {Component} from 'react';

class Error extends  Component {
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <React.Fragment>
                <h1>404</h1>
                <h2>Page not Found</h2>
            </React.Fragment>
        );
    }
}

export default Error;