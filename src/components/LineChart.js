import React, {Component} from 'react';
import Chart from 'chart.js';

class LineChart extends Component {
    constructor(props) {
        super(props);
        this.chartRef = React.createRef();
    }

    componentDidMount() {
        this.myChart = new Chart(this.chartRef.current, {
            type: 'line',
            data: {
                labels: this.props.countries,
                datasets: [{
                    label: this.props.title,
                    data: this.props.val,
                    fill: 'none',
                    backgroundColor: this.props.color,
                    pointRadius: 2,
                    borderColor: this.props.color,
                    borderWidth: 1,
                    lineTension: 0
                }]
            }
        });
    }

    render() {
        return (<canvas ref={this.chartRef}/>);
    }
}

export default LineChart;
