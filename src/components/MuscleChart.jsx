import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function MuscleChart({ data }) {
    const chartData = {
        labels: ['Jambes (Vélo)', 'Tirage (Swim Catch)', 'Poussée (Swim Finish)', 'Gainage/Core'],
        datasets: [
            {
                data: data,
                backgroundColor: ['#D4A373', '#607D8B', '#90A4AE', '#CFD8DC'],
                borderWidth: 0,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    usePointStyle: true,
                    pointStyle: 'circle',
                    padding: 15,
                    font: { size: 10, family: 'Inter' }
                }
            }
        },
        cutout: '70%',
    };

    return <Doughnut data={chartData} options={options} />;
}
