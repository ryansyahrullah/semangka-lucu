/**
 * App - Main application with routing (Simplified - no games)
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SoundToggle } from './components/SoundToggle';
import { LandingPage } from './pages/LandingPage';
import { ReunionMessage } from './pages/ReunionMessage';
import { GiftBox } from './pages/GiftBox';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        {/* Global sound toggle */}
        <SoundToggle />
        
        {/* Scanlines overlay */}
        <div className="scanlines" />
        
        {/* Routes */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/message" element={<ReunionMessage />} />
          <Route path="/gift" element={<GiftBox />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
