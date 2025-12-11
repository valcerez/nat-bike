import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

export default function IntensityChart({ data, isHighIntensity }) {
    const chartData = {
        labels: ['0', '5', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'],
        datasets: [
            {
                label: 'Intensité Cardiaque Estimée (%)',
                data: data,
                borderColor: isHighIntensity ? '#E57373' : '#D4A373',
                backgroundColor: isHighIntensity ? 'rgba(229, 115, 115, 0.1)' : 'rgba(212, 163, 115, 0.1)',
                fill: true,
                tension: 0.4,
                pointRadius: 0,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                ticks: { display: false },
                grid: { display: false },
            },
            x: {
                grid: { display: false },
                ticks: { font: { size: 10, family: 'Inter' } },
            },
        },
        plugins: {
            legend: { display: false },
            tooltip: { mode: 'index', intersect: false },
        },
        interaction: {
            mode: 'nearest',
            axis: 'x',
            intersect: false
        }
    };

    return <Line data={chartData} options={options} />;
}
