import StudentStats from './components/StudentStats.jsx'
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement, LineController} from 'chart.js';
Chart.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    LineController
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
