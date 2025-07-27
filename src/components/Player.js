import React from "react";

const Player = ({currentSong, isPlaying, onPlayPause, onNext, onPrevious, currentTime, duration, onProgressClick}) => {
    // Helper function to format time
    const formatTime = (time) => {
        if (isNaN(time)) return "0:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    // Helper to handle progress bar clicks
    const handleProgressClick = (e) => {
        const progressElement = e.currentTarget;
        const rect = progressElement.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const elementWidth = rect.width;
        const newTime = (clickX / elementWidth) * duration;
        
        onProgressClick(Math.max(0, Math.min(newTime, duration)));
    };

    // ASCII progress bar!
    const generateAsciiProgressBar = (currentTime, duration) => {
        const barLength = 18; // Total number of characters in the bar
        const filledLength = duration > 0 ? Math.round((currentTime / duration) * barLength) : 0;
        const emptyLength = barLength - filledLength;
        
        const filledChar = '█'; // Full block character
        const emptyChar = '░';  // Light shade character
        
        return filledChar.repeat(filledLength) + emptyChar.repeat(emptyLength);
    };

    return (
        <div className="play-controls">
            <div className="progress-container">
                <span className="time-display">{formatTime(currentTime)}</span>
                <div className="ascii-progress-bar" onClick={handleProgressClick}>
                    {generateAsciiProgressBar(currentTime, duration)}
                </div>
                <span className="time-display">{formatTime(duration)}</span>
            </div>

            <img className="control-button" onClick={onPrevious}
                src = {"/buttons/prev.png"}
                alt = ""
            /> 
            <img className="control-button" onClick={onPlayPause}
                src = {isPlaying ? "/buttons/pause-button.png" : "/buttons/play-button.png"}
                alt = ""
            /> 
            <img className="control-button" onClick={onNext}
                src = {"/buttons/next.png"}
                alt = ""
            />

        </div>
    );
};

export default Player; 