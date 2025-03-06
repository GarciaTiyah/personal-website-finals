import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import PageTransition from '../../components/PageTransition';
import './MusicPlaylist.css';

// Import images
import kendrickImg from '../../assets/images/kendrick.jpg';
import lanyImg from '../../assets/images/LANY.jpg';
import danielCeasarImg from '../../assets/images/DanielCeasar.jpg';
import waveToEarthImg from '../../assets/images/wavetoeart.jpg';
import arcticMonkeysImg from '../../assets/images/articmonkeys.png';

// Import audio files
import kendrickAudio from '../../assets/Songs/Kendrick Lamar - luther (Official Audio).mp3';
import lanyAudio from '../../assets/Songs/LANY - Super Far (Official Video).mp3';
import danielCeasarAudio from '../../assets/Songs/Daniel Caesar - Always (Official Audio).mp3';
import seasonsAudio from '../../assets/Songs/seasons.mp3';
import arcticMonkeysAudio from '../../assets/Songs/No. 1 Party Anthem.mp3';

const playlist = [
  {
    id: 1,
    title: "luther",
    artist: "Kendrick Lamar",
    image: kendrickImg,
    audio: kendrickAudio
  },
  {
    id: 2,
    title: "Super Far",
    artist: "LANY",
    image: lanyImg,
    audio: lanyAudio
  },
  {
    id: 3,
    title: "Always",
    artist: "Daniel Caesar",
    image: danielCeasarImg,
    audio: danielCeasarAudio
  },
  {
    id: 4,
    title: "Seasons",
    artist: "Wave to Earth",
    image: waveToEarthImg,
    audio: seasonsAudio
  },
  {
    id: 5,
    title: "No.1 Party Anthem",
    artist: "Arctic Monkeys",
    image: arcticMonkeysImg,
    audio: arcticMonkeysAudio
  }
];

export default function MusicPlaylist() {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef(null);

  const handlePlayPause = (index) => {
    if (currentTrack === index) {
      setIsPlaying(!isPlaying);
      if (isPlaying) {
        playerRef.current.audio.current.pause();
      } else {
        playerRef.current.audio.current.play();
      }
    } else {
      setCurrentTrack(index);
      setIsPlaying(true);
    }
  };

  const handleSongEnd = () => {
    const nextTrack = (currentTrack + 1) % playlist.length;
    setCurrentTrack(nextTrack);
  };

  return (
    <PageTransition>
      <div className="page-container">
        <div className="page-section playlist-container">
          <h1 className="section-title">Music Playlist</h1>
          
          <div className="playlist-content">
            <div className="songs-list">
              {playlist.map((song, index) => (
                <motion.div
                  key={song.id}
                  className={`song-card ${currentTrack === index ? 'active' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="song-image">
                    <img src={song.image} alt={`${song.artist} - ${song.title}`} />
                    <button
                      className="play-pause-btn"
                      onClick={() => handlePlayPause(index)}
                    >
                      <FontAwesomeIcon 
                        icon={currentTrack === index && isPlaying ? faPause : faPlay}
                      />
                    </button>
                  </div>
                  <div className="song-info">
                    <h3>{song.title}</h3>
                    <p>{song.artist}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="player-container">
              {playlist[currentTrack] && (
                <div className="now-playing">
                  <img
                    src={playlist[currentTrack].image}
                    alt={`${playlist[currentTrack].artist} - ${playlist[currentTrack].title}`}
                    className="current-song-image"
                  />
                  <div className="current-song-info">
                    <h3>{playlist[currentTrack].title}</h3>
                    <p>{playlist[currentTrack].artist}</p>
                  </div>
                </div>
              )}
              <AudioPlayer
                ref={playerRef}
                autoPlay={false}
                src={playlist[currentTrack].audio}
                onEnded={handleSongEnd}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                showSkipControls={true}
                showJumpControls={false}
                onClickPrevious={() => setCurrentTrack((currentTrack - 1 + playlist.length) % playlist.length)}
                onClickNext={() => setCurrentTrack((currentTrack + 1) % playlist.length)}
                className="rhap-custom"
              />
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
