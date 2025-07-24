import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement, RadialLinearScale } from 'chart.js';
import { Line, Bar, Doughnut, Pie, PolarArea, Radar, Bubble, Scatter } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement, RadialLinearScale);

const ChartFormat = ({ type, data, options }) => {
  switch (type) {
    case 'bubble':
      return <Bubble data={data} options={options} />;
    case 'scatter':
      return <Scatter data={data} options={options} />;
    case 'radar':
      return <Radar data={data} options={options} />;
    case 'polararea':
      return <PolarArea data={data} options={options} />;
    case 'doughnut':
      return <Doughnut data={data} options={options} />;
    case 'pie':
      return <Pie data={data} options={options} />;
    case 'bar':
      return <Bar data={data} options={options} />;
    case 'line':
      return <Line data={data} options={options} />;
    default:
      return <Line data={data} options={options} />;
  }
};

export default ChartFormat;