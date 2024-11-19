import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import DesignDetailsForm from './DesignDetailsForm';
import DesignsEngraving from "./DesignsEngraving";
import ScreensEndringFitting from "./ScreensEndringFitting";
import ScreensLocation from "./ScreensLocation";
import ScreenWarehouse from './ScreenWarehouse';
import DesignDetailsInput from './DesignDetailsInput';

function App() {
 
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/DesignDetailsForm" element={<DesignDetailsForm />} />
        <Route path="/DesignsEngraving" element={<DesignsEngraving />} />
        <Route path="/ScreensEndringFitting" element={<ScreensEndringFitting />} />
        <Route path="/ScreensLocation" element={<ScreensLocation />} />
        <Route path="/ScreenWarehouse" element={<ScreenWarehouse />} />
        <Route path="/DesignDetailsInput" element={<DesignDetailsInput />} />
      </Routes>
    </Router>
  );
}

export default App;
