import React from "react";

import './track.css';


const Track = (props) => {
    const addTrack = (event) => {
            props.onAdd(props.track);
        };

    const removeTrack = (event) => {
            props.onRemove(props.track);
        };

    const addOrRemoveTrack = () => {
        return (
            <button className='addOrRemove' onClick={props.isRemoval ? removeTrack : addTrack}>
                {props.isRemoval ? '-' : '+'}
            </button>
        );
    };
 



    return(
        <div className="Track">
         <div className="TrackInfo">
         <h5>{props.track.name}</h5>
         <p>
            {props.track.artist} | {props.track.album}
         </p>
         </div>
         {addOrRemoveTrack()}   
        </div>
    );




};

export default Track;