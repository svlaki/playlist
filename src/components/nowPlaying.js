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
                /*style={{width: '325px', height: '325px'}} */
                style={{width: '100%', height: 'auto'}}
                className="album-art"
            />

            <div className="song-info">
                <h3 style={{fontSize: '2.5vh'}}>{currentSong.title} - {currentSong.artist} </h3>
            </div>

            <div className="song-note">
                <p style={{fontSize: '1.5vh'}}>{currentSong.note}</p>
            </div>

        </div>
    );
};

export default NowPlaying;

