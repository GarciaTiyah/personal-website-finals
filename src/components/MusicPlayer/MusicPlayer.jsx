import React, { useState, useRef } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import 'react-h5-audio-player/lib/styles.css';
import './MusicPlayer.css';

export default function MusicPlayer({ image, audioSrc }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioPlayerRef = useRef(null);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  return (
    <div className="music-player-container">
      <div className={`disc-container ${isPlaying ? 'spinning' : ''}`}>
        <img src={image} alt="Album Cover" className="disc-image" />
      </div>
      <h3 className="song-title">Metro Boomin, Future - Too Many Nights</h3>
      <AudioPlayer
        ref={audioPlayerRef}
        src={audioSrc}
        onPlay={handlePlay}
        onPause={handlePause}
        showJumpControls={false}
        customControlsSection={[
          'MAIN_CONTROLS',
          'VOLUME_CONTROLS'
        ]}
        customProgressBarSection={[
          'PROGRESS_BAR',
          'CURRENT_TIME',
          'DURATION'
        ]}
        className="custom-audio-player"
      />
    </div>
  );
}