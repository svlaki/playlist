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


  // Function to handle showing the welcome page
  const enterPlayer = () => {
    setShowWelcome(false);
    setIsPlaying(true);
  }

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
          <h1> Welcome to your music player! </h1>

          <button onClick={enterPlayer} className="enter-button">
            Enter!
          </button>
        </div>
      ) : 
      (
        // Player screen
        <div className = "player-screen">
          
          <div className = "title">
            <h1>My Music Player</h1>
            <button onClick={enterWelcome} className="return-home">
              Home
            </button>
          </div>

          <div className = "content">
            <div className = "player-section">
              <NowPlaying currentSong = {currentSong} />
              <Player 
                currentSong = {currentSong}
                isPlaying = {isPlaying}
                onPlayPause={handlePlayPause}
                onNext={handleNext}
                onPrevious={handlePrev}
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
          />
   
      </div>          
      )}
  </div>
  )
}

export default App;