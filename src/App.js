import React, { useState, useEffect } from 'react';
import './App.css';
import Player from './components/Player';  // Import your Player
import NowPlaying from './components/nowPlaying';
import Playlist from './components/Playlist';
import { songs } from './data/songs';  // Import songs


function App() {
  // React useStates
  const [currentSongIdx, setCurrentSongIdx] = useState(0); // Starts @ first song
  const [isPlaying, setIsPlaying] = useState(false); // Starts as not playing
  const [audioRef, setAudioRef] = useState(null);  // Starts as no audio
  const [showWelcome, setShowWelcome] = useState(true);  // Starts on the welcome page
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const currentSong = songs[currentSongIdx];

  // useEffect to automatically detect changes
  useEffect(() => {
    if (audioRef && isPlaying) {
      const playAudio = async () => {
        try {
          await audioRef.play();
        } catch (error) {
          console.log("Audio play failed:", error);
          setIsPlaying(false);
        }
      };
      playAudio();
    }
  }, [currentSongIdx, audioRef, isPlaying]);  // Run when song or audio changes

  // Function to handle time updates
  const handleTimeUpdate = () => {
    if (audioRef) {
      setCurrentTime(audioRef.currentTime);
    }
  }

  // Function to handle loaded metadata (duration)
  const handleMeta = () => {
    if (audioRef) {
      setDuration(audioRef.duration);
    }
  }

  // Function to handle progress bar clicks
  const handleProgressBar = (newTime) => {
    if (audioRef) {
      audioRef.currentTime = newTime;
      setCurrentTime = newTime;
    }
  }

  // Function to handle showing the welcome page
  const enterPlayer = () => {
    setShowWelcome(false);
    setIsPlaying(true);
  }

  // Function to handle displaying the welcome page
  const enterWelcome = () => {
    setShowWelcome(true);
    setIsPlaying(false);
  }

  // Function to handle play/pause button
  const handlePlayPause = () => {
    if (!audioRef) {
      console.log("No audio file found!");
    }

    if (isPlaying) {
      audioRef.pause();
      setIsPlaying(false);
    } else {
      audioRef.play();
      setIsPlaying(true);
    }
  }

  // Function to handle the next button
  const handleNext = () => {
    console.log("Next clicked! Current index: ", currentSongIdx)
    let nextIdx;
    if (currentSongIdx < songs.length -1) {
      nextIdx = currentSongIdx + 1;
    } else {
      nextIdx = 0; // Go back to first song
    }
    setCurrentSongIdx(nextIdx);
    setIsPlaying(true);
  }

  // Function to handle the previous button
  const handlePrev = () => {
    console.log("Prev clicked! Current index: ", currentSongIdx)
    let prevIdx;
    if (currentSongIdx !== 0) {
      prevIdx = currentSongIdx - 1;
    } else {
      prevIdx = currentSongIdx;
    }

    setCurrentSongIdx(prevIdx);
    setIsPlaying(true);
  }

  // Function to handle song selection in playlist
  const handleSongSelect = (song) => {
    const songIndex = songs.findIndex(s => s.id === song.id);
    setCurrentSongIdx(songIndex);
    setIsPlaying(true);
  }


  // JSX 
  return (
    <div className="music-player">
      {showWelcome ? (
        // Welcome screen
        <div className = "welcome-screen">
          <h1> welcome to your music player! </h1>
          <button onClick={enterPlayer} className="enter-button">
            Enter!
          </button>
        </div>
      ) : 
      (
        // Player screen
        <div className = "player-screen">
          
          <div className = "title">
            <h1>music player!</h1>
            <button onClick={enterWelcome} className="return-home">
              Home
          </button>
          </div>


          <div className = "content">
            <div className = "player-section">
              <NowPlaying currentSong = {currentSong} /> 
            </div>

            <div className = "control-section" >
              <Player 
                  currentSong = {currentSong}
                  isPlaying = {isPlaying}
                  onPlayPause={handlePlayPause}
                  onNext={handleNext}
                  onPrevious={handlePrev}
                  currentTime = {currentTime}
                  duration = {duration}
                  onProgressClick = {handleProgressBar}
              />
            </div>

            <div className = "playlist-section">
              <Playlist 
              songs = {songs}
              currentSongId = {currentSong.id}
              onSongSelect = {handleSongSelect} 
              />
            </div>
          </div>


          <audio
              ref={(audio) => setAudioRef(audio)}
              src={currentSong.audioFile}
              onEnded={() => handleNext()}
              onTimeUpdate={handleTimeUpdate}
              onMeta = {handleMeta}
          />
   
      </div>          
      )}
  </div>
  )
}

export default App;