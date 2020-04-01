import React, {Component} from 'react';

class MapView extends Component {
    constructor(props) {
        super(props);
        this.lat = this.props.location.state.lat ? this.props.location.state.lat : 10;
        this.long = this.props.location.state.long ? this.props.location.state.long : 8;
        this.country = this.props.location.state.country ? this.props.location.state.country : "Nigeria";
        this.url = `https://www.google.com/maps/embed/v1/view?key=${process.env.REACT_APP_MAPS_API_KEY} &center=${this.lat},${this.long}&zoom=7`;
    }

    render() {
        return (
            <>
                <h1 style={{color: process.env.REACT_APP_ACCENT_COLOR, margin: '10px', fontFamily: 'san-serif',
                    fontWeight: 'bolder', border: '2px solid gray', borderRadius: '2px'}}>{this.country}</h1>

                <iframe
                    frameBorder="5" style={{border: '0', marginTop: '10px', width:"95vw",
                    marginBottom: '100px',
                    height:"80vh",
                    borderRadius: '5px',
                    boxShadow: '5px 4px 3px 3px gray, -5px -4px 3px 3px #dddddd' }}
                    src={this.url} allowFullScreen>
                </iframe>
            </>
        );
    }
}

export default MapView
