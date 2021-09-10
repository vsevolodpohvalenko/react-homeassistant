import React from 'react';
import { Chart, Dataset, ButtonGroup, Button } from 'react-rainbow-components';

const containerStyles = {
    width: 600,
};

const { FontAwesomeIcon } = require('@fortawesome/react-fontawesome');
const { faPlus, faMinus } = require('@fortawesome/free-solid-svg-icons');

export default class LineChartExample extends React.Component {
    private titles: string[];
    private colors: string[];
    private months: string[];
    constructor(props: any) {
        super(props);
        this.titles = ['Data-Yellow', 'Data-Green', 'Data-Orange', 'Data-Purple', 'Data-Dark'];
        this.colors = ['#ffcc00', '#1ad1a3', '#ff6837', '#663398', '#061c3f'];
        this.months = ['July', 'August', 'September', 'October', 'November', 'December'];
        this.state = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
            datasets: [
                {
                    title: 'Data-Red',
                    borderColor: '#fe4849',
                    values: [37, 15, 90, 57, 80, 14],
                },
                {
                    title: 'Data-Blue',
                    borderColor: '#01b6f5',
                    values: [18, 39, 15, 38, 15, 35],
                },
            ],
        };
    }

    addDataset() {
        // @ts-ignore
        const { labels, datasets } = this.state;
        const newValues = labels.map((label: any) => Math.round(Math.random() * 100));
        const newDatasets = datasets.concat({
            title: this.titles.shift(),
            values: newValues,
            borderColor: this.colors.shift(),
        });
        this.setState({ datasets: newDatasets });
    }

    removeDataset() {
        // @ts-ignore
        const { datasets } = this.state;
        const dataset = datasets[datasets.length - 1];
        this.titles.unshift(dataset.title);
        this.colors.unshift(dataset.borderColor);
        const newDatasets = datasets.filter((d: any) => d.title !== dataset.title);
        this.setState({ datasets: newDatasets });
    }

    addMonth() {
        // @ts-ignore
        const { labels, datasets } = this.state;
        const newlabels = labels.concat(this.months.shift());
        const newDatasets = datasets.map((dataset: any) => {
            const { values, ...rest } = dataset;
            const newValues = values.concat(Math.round(Math.random() * 100));
            return {
                ...rest,
                values: newValues,
            };
        });
        this.setState({ labels: newlabels, datasets: newDatasets });
    }

    removeMonth() {
        // @ts-ignore
        const { labels, datasets } = this.state;
        const label = labels[labels.length - 1];
        this.months.unshift(label);
        const newLabels = labels.filter((l: any) => l !== label);
        const newDatasets = datasets.map((dataset: any) => {
            const { values, ...rest } = dataset;
            const newValues = values.slice(0, values.length - 1);
            return {
                ...rest,
                values: newValues,
            };
        });
        this.setState({ labels: newLabels, datasets: newDatasets });
    }

    renderDatasets() {
        // @ts-ignore
        const { datasets } = this.state;
        return datasets.map(({ title, values, borderColor } : any) => (
            <Dataset
                key={title}
                title={title}
                values={values}
                borderColor={borderColor}
                backgroundColor={borderColor}
            />
        ));
    }

    render() {
        // @ts-ignore
        const { labels, datasets } = this.state;

        const noMoreTitles = this.titles.length === 0;
        const noMoreDatasets = datasets.length === 0;
        const noMoreMonths = this.months.length === 0;
        const noMoreLabels = labels.length === 0;

        return (
            <div>
                <div>
                    <ButtonGroup style={{margin: '0.75rem 1.5rem'}}>
                        <Button onClick={() => this.addDataset()} disabled={noMoreTitles}>
                            <FontAwesomeIcon style={{marginRight: '0.5rem'}} icon={faPlus} />{' '}
                            Data
                        </Button>
                        <Button onClick={() => this.removeDataset()} disabled={noMoreDatasets}>
                            <FontAwesomeIcon style={{marginRight: '0.5rem'}} icon={faMinus} />{' '}
                            Data
                        </Button>
                    </ButtonGroup>
                    <ButtonGroup style={{margin: '0.75rem 1.5rem'}}>
                        <Button onClick={() => this.addMonth()} disabled={noMoreMonths}>
                            <FontAwesomeIcon style={{marginRight: '0.5rem'}} icon={faPlus} />{' '}
                            Month
                        </Button>
                        <Button onClick={() => this.removeMonth()} disabled={noMoreLabels}>
                            <FontAwesomeIcon style={{marginRight: '0.5rem'}} icon={faMinus} />{' '}
                            Month
                        </Button>
                    </ButtonGroup>
                </div>
                <div style={containerStyles}>
                    <Chart labels={labels} type="line">
                        {this.renderDatasets()}
                    </Chart>
                </div>
            </div>
        );
    }
}
