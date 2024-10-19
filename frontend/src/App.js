import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import DesignDetailsForm from './DesignDetailsForm';

function App() {
 
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/DesignDetailsForm" element={<DesignDetailsForm />} />
      </Routes>
    </Router>
  );
}

export default App;
