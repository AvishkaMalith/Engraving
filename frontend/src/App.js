import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import DesignDetailsForm from './DesignDetailsForm';
import DesignsEngraving from "./DesignsEngraving";
import ScreensEndringFitting from "./EndringFitting";
import AddLocations from "./AddLocations";
import ScreenLocations from './ScreenLocations';
import DesignDetailsInput from './DesignDetailsInput';
import Test from "./test";

function App() {
 
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/DesignDetailsForm" element={<DesignDetailsForm />} />
        <Route path="/DesignsEngraving" element={<DesignsEngraving />} />
        <Route path="/EndringFitting" element={<ScreensEndringFitting />} />
        <Route path="/AddLocations" element={<AddLocations />} />
        <Route path="/ScreenLocations" element={<ScreenLocations />} />
        <Route path="/DesignDetailsInput" element={<DesignDetailsInput />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </Router>
  );
}

export default App;
