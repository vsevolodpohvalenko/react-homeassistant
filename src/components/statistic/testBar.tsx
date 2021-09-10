import {ApexOptions} from "apexcharts";
import ReactApexChart from "react-apexcharts";


export const TestBar = () => {

    const series = [{
        area: 'Living Room',
        data: [10, 13, 12, 19, 21, 12, 23, 13],
    }, {
        area: 'Master Bedroom',
        data: [3, 12, 21, 12, 22, 14, 12, 16],
    }]

    const options: ApexOptions = {
        chart: {
            type: 'bar',
            height: 350
        },
        colors: ['rgb(234, 0, 104)', 'rgb(0, 185, 234)', 'rgb(52, 217, 164)'],
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',

            },
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        xaxis: {
            categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
        },
        yaxis: {

        },
        fill: {
            opacity: 1
        },
    };

    return <ReactApexChart options={options} series={series} type="bar" height={350} />
}
