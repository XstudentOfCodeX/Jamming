import React from 'react';

import './tracklist.css';

import Track from '../track/track';

const TrackList = (props) => {
    if (!props.tracks) {
        return null; 
    }
    return (
        <div className='Tracklist'>
            {props.tracks.map((track) => {
                return (
                    <Track 
                    track={track}
                    key={track.id}
                    onAdd={props.onAdd}
                    isRemoval={props.isRemoval}
                    onRemove={props.onRemove}
                    />
                );
            })}
        </div>
    );

  };
    
export default TrackList;
    
    





                  
                
            
   
