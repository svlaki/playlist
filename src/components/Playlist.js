import React from "react"

const Playlist= ({ songs, currentSongId, onSongSelect }) => {
    return (
        <div className = "playlist">
            <h3> songs 4 u </h3>

            <div className = "song-list">
                {songs.map((song) => (
                    <div 
                        key={song.id}
                        className={`song-item ${currentSongId === song.id ? 'active' : ''}`}
                        onClick={() => onSongSelect(song)}
                        style={{ backgroundColor: currentSongId === song.id ? 'lightblue' : 'white' }}
                    >
                    <p>
                        {song.title}
                    </p>
                    </div>
                ))}
            </div>
        </div>
    )

    
};

export default Playlist;