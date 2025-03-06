import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar/Navbar';
import AboutMe from './pages/AboutMe/AboutMe';
import Education from './pages/Education/Education';
import Hobbies from './pages/Hobbies/Hobbies';
import Goals from './pages/Goals/Goals';
import ITExperience from './pages/ITExperience/ITExperience';
import PhotoGallery from './pages/PhotoGallery/PhotoGallery';
import Photobooth from './pages/Photobooth/Photobooth';
import Achievements from './pages/Achievements/Achievements';
import Feedback from './pages/Feedback/Feedback';
import MusicPlaylist from './pages/MusicPlaylist/MusicPlaylist';
import MyLove from './pages/MyLove/MyLove';
import './styles/global.css';
import backgroundVideo from './assets/background1.mp4';

function App() {
  return (
    <Router>
      <div className="app">
        <video className="background-video" autoPlay loop muted>
          <source src={backgroundVideo} type="video/mp4" />
        </video>
        <Navbar />
        <main>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<AboutMe />} />
              <Route path="/education" element={<Education />} />
              <Route path="/music" element={<MusicPlaylist />} />
              <Route path="/hobbies" element={<Hobbies />} />
              <Route path="/goals" element={<Goals />} />
              <Route path="/experience" element={<ITExperience />} />
              <Route path="/gallery" element={<PhotoGallery />} />
              <Route path="/achievements" element={<Achievements />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/photobooth" element={<Photobooth />} />
              <Route path="/mylove" element={<MyLove />} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </Router>
  );
}

export default App;
