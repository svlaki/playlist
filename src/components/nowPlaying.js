import React from 'react'

const NowPlaying = ({currentSong}) => {
    if (!currentSong) {
        return (
            <div>Choose a song!</div>
        );
    }

    return (
        <div className="now-playing">
            <img
                src={currentSong.image}
                alt={currentSong.title}
                className="album-art"
            />

            <div className="song-info">
                <h2>{currentSong.title} - {currentSong.artist} </h2>
            </div>

            <div className="song-note">
                <p>{currentSong.note}</p>
            </div>

        </div>
    );
};

export default NowPlaying;

