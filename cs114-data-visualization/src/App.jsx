import StudentStats from './components/StudentStats.jsx'
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement, LineController, BarController} from 'chart.js';
Chart.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    LineController,
    BarController,
)
Chart.defaults.font.family = 'Torus Pro';

function App() {
  return (
    <>
      <StudentStats/>
    </>
  )
}

export default App
