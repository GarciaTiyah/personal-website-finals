import PageTransition from '../../components/PageTransition';
import './AboutMe.css';
import profileImage from '../../assets/images/ProfileWebsite.jpg';
import metroImage from '../../assets/images/Metro/metro2.jpg';
import MusicPlayer from '../../components/MusicPlayer/MusicPlayer';
import metroSong from '../../assets/Songs/MetroSongs/Metro Boomin, Future - Too Many Nights (Visualizer) ft. Don Toliver.mp3';

export default function AboutMe() {
  return (
    <PageTransition>
      <section className="page-section about-section">
        <h1 className="section-title">About Me</h1>
        <div className="about-content">
          <div className="profile-image">
            <img src={profileImage} alt="Christian A. Garcia" />
            <div className="social-buttons">
              <button onClick={() => window.open('https://www.facebook.com/share/1BaMHeaEom/', '_blank')}>
                <i className="fab fa-facebook"></i>
                <span>Facebook</span>
              </button>
              <button onClick={() => window.open('https://www.instagram.com/tiyanisnothere/', '_blank')}>
                <i className="fab fa-instagram"></i>
                <span>Instagram</span>
              </button>
              <button onClick={() => window.open('https://www.linkedin.com/in/christian-garcia-044195289/', '_blank')}>
                <i className="fab fa-linkedin"></i>
                <span>LinkedIn</span>
              </button>
              <button onClick={() => window.open('https://github.com/GarciaTiyah', '_blank')}>
                <i className="fab fa-github"></i>
                <span>GitHub</span>
              </button>
            </div>
            <div className="music-player-wrapper">
              <MusicPlayer image={metroImage} audioSrc={metroSong} />
            </div>
          </div>
          <div className="profile-info">
            <h2>Christian A. Garcia</h2>
            <p className="title">IT Student</p>
            <p className="description">
            Hello! I'm Christian Garcia, an IT student and aspiring software developer passionate about creating innovative solutions. I focus on enhancing user experiences through web technologies, from developing a school food service app to automating business processes for a beach resort.
            </p>
            <div className="quick-info">
              <div className="info-item">
                <strong>Location:</strong>
                <span>Philippines, Metro Manila</span>
              </div>
              <div className="info-item">
                <strong>Email:</strong>
                <span>christian29loco@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
