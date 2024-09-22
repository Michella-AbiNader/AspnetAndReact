/* eslint-disable react/prop-types */
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

const getMonthName = (monthNumber) => {
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    return monthNames[monthNumber - 1]; // Convert month number to name
};

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const LineChart = ({ salesData, labelKey, dataKey, dataLabel, isMonthChart = false, title, color }) => {
    // Generate dynamic labels (e.g., month names or other labels)
    const labels = isMonthChart
        ? salesData.map(item => getMonthName(item[labelKey]))  // Convert month numbers to names if applicable
        : salesData.map(item => item[labelKey]);               // Use generic labels (e.g., product names)

    // Extract dynamic dataset (e.g., totalSales or other metrics)
    const dataPoints = salesData.map(item => item[dataKey]);

    const data = {
        labels,
        datasets: [
            {
                label: dataLabel,      // Custom label for the data (e.g., Total Sales)
                data: dataPoints,      // Data values for the chart
                fill: false,           // Disable background fill for Line Chart
                borderColor: color,   // Line color
                tension: 0.1           // Make the line smooth
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: title,  // Title of the chart
            },
        },
    };

    return <Line data={data} options={options} />;
};

export default LineChart;
