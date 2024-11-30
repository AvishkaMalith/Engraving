import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import DesignsEngraving from "./DesignsEngraving";
import ScreensEndringFitting from "./EndringFitting";
import AddLocations from "./AddLocations";
import ScreenLocations from './ScreenLocations';
import DesignDetailsInput from './DesignDetailsInput';
import RemoveLocations from './RemoveLocations';
import EndringRemoving from './EndringRemoving';
import EndringRemoved from './EndringRemoved';

function App() {
 
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/DesignsEngraving" element={<DesignsEngraving />} />
        <Route path="/EndringFitting" element={<ScreensEndringFitting />} />
        <Route path="/AddLocations" element={<AddLocations />} />
        <Route path="/ScreenLocations" element={<ScreenLocations />} />
        <Route path="/RemoveLocations" element={<RemoveLocations />} />
        <Route path="/DesignDetailsInput" element={<DesignDetailsInput />} />
        <Route path="/EndringRemoving" element={<EndringRemoving />} />
        <Route path="/EndringRemoved" element={<EndringRemoved />} />        
      </Routes>
    </Router>
  );
}

export default App;
