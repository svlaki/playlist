import React from "react";

const Player = ({currentSong, isPlaying, onPlayPause, onNext, onPrevious}) => {
    return (
        <div className="player-buttons">
            <button className="control-button" onClick={onPrevious}> Previous </button>  
            <button className="control-button" onClick={onPlayPause}> 
                {isPlaying ? "Pause" : "Play"} 
            </button>
            <button className="control-button" onClick={onNext}> Next </button>
        </div>
    );
};

export default Player; 