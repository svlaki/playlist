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
        const barLength = 26; 
        const filledLength = duration > 0 ? Math.round((currentTime / duration) * barLength) : 0;
        const emptyLength = barLength - filledLength;
        
        const filledChar = '■'; 
        const emptyChar = '□';  
        
        return filledChar.repeat(filledLength) + emptyChar.repeat(emptyLength);
    };

    return (
        <>
            {/* Progress container at the top */}
            <div className="progress-container">
                <span className="time-display">{formatTime(currentTime)}</span>
                <div className="ascii-progress-bar" onClick={handleProgressClick}>
                    {generateAsciiProgressBar(currentTime, duration)}
                </div>
                <span className="time-display">{formatTime(duration)}</span>
            </div>

            {/* Button controls at the bottom */}
            <div className="play-controls">
                <img className="gun-button" onClick={onPrevious}
                    src={"/designs/prev.png"}
                    alt="Previous"
                /> 
                <img className="control-button" onClick={onPlayPause}
                    src={isPlaying ? "/designs/pause-button.png" : "/designs/play-button.png"}
                    alt={isPlaying ? "Pause" : "Play"}
                /> 
                <img className="gun-button" onClick={onNext}
                    src={"/designs/next.png"}
                    alt="Next"
                />
            </div>
        </>
    );
};

export default Player;