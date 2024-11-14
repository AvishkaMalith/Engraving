import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import DesignDetailsForm from './DesignDetailsForm';
import DesignsEngraving from "./DesignsEngraving";
import ScreensEndringFitting from "./ScreensEndringFitting";
import ScreensLocation from "./ScreensLocation";

function App() {
 
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/DesignDetailsForm" element={<DesignDetailsForm />} />
        <Route path="/DesignsEngraving" element={<DesignsEngraving />} />
        <Route path="/ScreensEndringFitting" element={<ScreensEndringFitting />} />
        <Route path="/ScreensLocation" element={<ScreensLocation />} />
      </Routes>
    </Router>
  );
}

export default App;
