import React, { useCallback } from 'react';

import TrackList from '../tracklist/tracklist';


const Playlist = (props) => {
    const handleNameChange = useCallback(
        (event) => {
            props.onNameChange(event.target.value);
        }, [props.onNameChange]
    );


    return (
        <div>
            <input onChange={handleNameChange} defaultValue={"New Playlist"} />
            <TrackList 
            tracks={props.playlistTracks}
            isRemoval={true}
            onRemove={props.onRemove}
            />
            <button onClick={props.onSave}>
                SAVE
            </button>
        </div>
    );
};

export default Playlist;