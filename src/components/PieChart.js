import React, {Component, createRef} from "react";
import Chart from 'chart.js';

class PieChart extends Component {
    constructor(props) {
        super(props);
        this.chartRef = createRef();
    }

    componentDidMount() {
        this.myChart = new Chart(this.chartRef.current, {
            type: this.props.type,
            options: {
                title: {
                    display: true,
                    text: this.props.title
                }
            },
            data: {labels: this.props.labels, datasets: [{data: this.props.data, backgroundColor: this.props.colors}]}
        });
    }

    render() {
        return (
            <canvas ref={this.chartRef} />
        );
    }
}

export default PieChart;
