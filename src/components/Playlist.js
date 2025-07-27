import React from "react"

const Playlist= ({ songs, currentSongId, onSongSelect }) => {
    return (
        <div className = "playlist">
            <a 
            className="spotify-link" 
            href="https://open.spotify.com/playlist/7wGzhFYY8GfG5ydoRqbYYL?si=c49964bb6d194c9a" 
            target="_blank" 
            rel="noopener noreferrer"
            > 
                songs 4 u 
            </a>

            <div className = "song-list">
                {songs.map((song) => (
                    <div 
                        key={song.id}
                        className={`song-item ${currentSongId === song.id ? 'active' : ''}`}
                        onClick={() => onSongSelect(song)}
                        style={{ backgroundColor: currentSongId === song.id ? 'lightcyan' : 'white' }}
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