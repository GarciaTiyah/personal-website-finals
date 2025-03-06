import { useState, useRef } from 'react';
import './MyLove.css';
import PageTransition from '../../components/PageTransition';

// Import images
import bebe1 from '../../assets/images/bebe1.jpg';
import bebe2 from '../../assets/images/bebe2.jpg';
import bebe3 from '../../assets/images/bebe3.jpg';
import bebe4 from '../../assets/images/bebe4.jpg';
import bebe5 from '../../assets/images/bebe5.jpg';
import bebe6 from '../../assets/images/bebe6.jpg';

// Import audio files
import song1 from '../../assets/Songs/d4vd - Here With Me [Official Music Video].mp3';
import song2 from '../../assets/Songs/IV OF SPADES - Come Inside Of My Heart (Official Audio).mp3';
import song3 from '../../assets/Songs/kiyo - Ikaw Lang (Official Music Video).mp3';
import song4 from '../../assets/Songs/Miguel - Sure Thing (Lyrics).mp3';
import song5 from '../../assets/Songs/SunKissed Lola - Pasilyo (Official Lyric Video).mp3';
import song6 from '../../assets/Songs/South Border - Rainbow (Lyric) (1).mp3';

const songs = [
  {
    title: "Here With Me",
    artist: "d4vd",
    image: bebe1,
    audio: song1
  },
  {
    title: "Come Inside Of My Heart",
    artist: "IV OF SPADES",
    image: bebe2,
    audio: song2
  },
  {
    title: "Ikaw Lang",
    artist: "kiyo",
    image: bebe3,
    audio: song3
  },
  {
    title: "Sure Thing",
    artist: "Miguel",
    image: bebe4,
    audio: song4
  },
  {
    title: "Pasilyo",
    artist: "SunKissed Lola",
    image: bebe5,
    audio: song5
  },
  {
    title: "Rainbow",
    artist: "South Border",
    image: bebe6,
    audio: song6
  }
];

const MyLove = () => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  const findSongIndex = (song) => {
    return songs.findIndex(s => s === song);
  };

  const playNext = () => {
    if (!currentSong) return;
    const currentIndex = findSongIndex(currentSong);
    const nextIndex = (currentIndex + 1) % songs.length;
    const nextSong = songs[nextIndex];
    playSong(nextSong);
  };

  const playPrevious = () => {
    if (!currentSong) return;
    const currentIndex = findSongIndex(currentSong);
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    const prevSong = songs[prevIndex];
    playSong(prevSong);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const playSong = (song) => {
    if (currentSong === song && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      if (audioRef.current) {
        audioRef.current.src = song.audio;
        audioRef.current.play();
      }
      setCurrentSong(song);
      setIsPlaying(true);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
    setDuration(audioRef.current.duration);
  };

  const handleProgressClick = (e) => {
    const progressBar = e.currentTarget;
    const clickPosition = e.clientX - progressBar.getBoundingClientRect().left;
    const progressBarWidth = progressBar.offsetWidth;
    const newTime = (clickPosition / progressBarWidth) * duration;
    audioRef.current.currentTime = newTime;
  };

  return (
    <PageTransition>
      <div className="myLoveContainer">
        <div className="header">
          <h1>Songs About Her</h1>
        </div>
        <div className="songList">
          {songs.map((song, index) => (
            <div 
              key={index} 
              className={`songCard ${currentSong === song ? 'playing' : ''}`}
              onClick={() => playSong(song)}
            >
              <img src={song.image} alt={song.title} className="songImage" />
              <div className="songInfo">
                <h3>{song.title}</h3>
                <p>{song.artist}</p>
              </div>
              {currentSong === song && isPlaying && (
                <div className="playingIndicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              )}
            </div>
          ))}
        </div>

        {currentSong && (
          <div className="player">
            <div className="nowPlaying">
              <img src={currentSong.image} alt={currentSong.title} />
              <div className="songDetails">
                <h4>{currentSong.title}</h4>
                <p>{currentSong.artist}</p>
              </div>
            </div>
            
            <div className="controls">
              <div className="progressBar" onClick={handleProgressClick}>
                <div 
                  className="progress" 
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                ></div>
              </div>
              <div className="timeInfo">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
              <div className="playerControls">
                <button 
                  className="controlButton"
                  onClick={playPrevious}
                >
                  ⏮
                </button>
                <button 
                  className="playButton"
                  onClick={() => playSong(currentSong)}
                >
                  {isPlaying ? '⏸' : '▶'}
                </button>
                <button 
                  className="controlButton"
                  onClick={playNext}
                >
                  ⏭
                </button>
              </div>
              <div className="volumeControl">
                <button 
                  className="volumeButton"
                  onClick={toggleMute}
                >
                  {isMuted ? '🔇' : '🔊'}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="volumeSlider"
                />
              </div>
            </div>
          </div>
        )}

        <audio 
          ref={audioRef}
          onTimeUpdate={handleTimeUpdate}
          onEnded={playNext}
        />
      </div>
    </PageTransition>
  );
};

export default MyLove;
