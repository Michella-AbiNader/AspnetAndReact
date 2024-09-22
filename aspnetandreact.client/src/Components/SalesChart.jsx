/* eslint-disable react/prop-types */
import { Bar } from 'react-chartjs-2';
import { useEffect, useRef } from 'react';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

// Register the components
ChartJS.register(
    CategoryScale, // You need to register the 'category' scale
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
function lightenColor(color, percent) {
    const num = parseInt(color.replace("#", ""), 16),
        amt = Math.round(2.55 * percent),
        R = (num >> 16) + amt,
        G = (num >> 8 & 0x00FF) + amt,
        B = (num & 0x0000FF) + amt;
    return `#${(
        0x1000000 +
        (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
        (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
        (B < 255 ? B < 1 ? 0 : B : 255)
    ).toString(16).slice(1).toUpperCase()}`;
}
// Utility function to convert month number to month name if needed
const getMonthName = (monthNumber) => {
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    return monthNames[monthNumber - 1]; // Convert month number to name
};

const SalesChart = ({ salesData, labelKey, dataKey1, dataLabel1, dataKey2, dataLabel2, isMonthChart = false, title, color }) => {
    const chartRef = useRef(null); // Reference to the chart instance
    useEffect(() => {
        if (chartRef.current) {
            chartRef.current.destroy(); // Destroy the old chart before creating a new one
        }
    }, [salesData]);

    // If it's a month-based chart, convert the month number to a name, otherwise use the labelKey for labels
    const labels = isMonthChart
        ? salesData.map(item => getMonthName(item[labelKey])) // Use month conversion
        : salesData.map(item => item[labelKey]); // Use flexible label key (e.g., product_name)

    // Extract the data using the passed dataKey1 and dataKey2
    const data1 = salesData.map(item => item[dataKey1]); // First data set (e.g., totalSales or units_sold)
    const data2 = dataKey2 ? salesData.map(item => item[dataKey2]) : null; // Optional second data set (e.g., numOrders)

    const datasets = [
        {
            label: dataLabel1, // Custom label for the first dataset
            data: data1,
            backgroundColor: lightenColor(color, 20),
            borderColor: color,
            borderWidth: 1,
        },
    ];

    if (data2) {
        datasets.push({
            label: dataLabel2, // Custom label for the second dataset
            data: data2,
            backgroundColor: 'rgba(153, 102, 255, 0.6)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1,
        });
    }

    const data = {
        labels, // Use dynamic labels based on the provided key
        datasets,
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: title
            },
        },
    };

    return <Bar data={data} options={options} />;
};

export default SalesChart;
