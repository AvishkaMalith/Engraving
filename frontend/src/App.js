import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import DesignDetailsForm from './DesignDetailsForm';
import DesignsEngraving from "./DesignsEngraving";

function App() {
 
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/DesignDetailsForm" element={<DesignDetailsForm />} />
        <Route path="/DesignsEngraving" element={<DesignsEngraving />} />
      </Routes>
    </Router>
  );
}

export default App;
