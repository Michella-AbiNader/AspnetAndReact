/* eslint-disable react/prop-types */
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';

// Register chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ salesData, labelKey, dataKey, title }) => {
    // Generate labels dynamically (e.g., product names or order statuses)
    const labels = salesData.map(item => item[labelKey]);

    // Extract data points dynamically (e.g., units sold or total sales)
    const dataPoints = salesData.map(item => item[dataKey]);

    const data = {
        labels,  // Labels for the pie chart (e.g., product names or statuses)
        datasets: [
            {
                label: 'Data',
                data: dataPoints,  // Data points for each slice of the pie
                backgroundColor: [
                    'rgba(54, 162, 235)',
                    'rgba(255, 206, 86)',
                    'rgba(75, 192, 192)',
                    'rgba(153, 102, 255)',
                    'rgba(255, 159, 64)',
                    'rgba(253, 204, 229)',
                    'rgba(190, 185, 219)',
                    'rgba(255, 238, 101)'
                ],  // Dynamic colors for each slice
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false, // Allow flexibility with the chart size
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: title,  // Title of the pie chart
            },
        },
    };

    return (
        <div style={{ width: '550px', height: '300px' }}> {/* Custom size for the pie chart */}
            <Pie data={data} options={options} />
        </div>

    );
};

export default PieChart;
