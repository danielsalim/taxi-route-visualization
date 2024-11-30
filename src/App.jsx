// src/App.jsx
import Home from './pages/home';
import { createRoot } from 'react-dom/client'
import './styles/index.css';  // Tailwind CSS

const App = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Home />
    </div>
  );
};

export default App;

createRoot(document.getElementById('root')).render(
  <App />
)
