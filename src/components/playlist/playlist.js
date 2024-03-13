import React, { useCallback } from 'react';
import './playlist.css';
import TrackList from '../tracklist/tracklist';


const Playlist = ({ onNameChange, playlistTracks, onRemove, onSave,}) => {
    const handleNameChange = useCallback(
        (event) => {
            if(typeof onNameChange === 'function') {
            onNameChange(event.target.value);
            }
        }, [onNameChange]
    );


    return (
        <div className='Playlist'>
            <input  onChange={handleNameChange} defaultValue={"Enter Playlist Name"} />
            <TrackList 
            tracks={playlistTracks}
            isRemoval={true}
            onRemove={onRemove}
            />
            <button className='Playlist-save' onClick={onSave}>
                SAVE
            </button>
        </div>
    );
};

export default Playlist;