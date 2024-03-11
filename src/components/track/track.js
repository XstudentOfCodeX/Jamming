import React, {useCallback} from "react";




const Track = (props) => {
    const addTrack = useCallback(
        (event) => {
            props.onAdd(props.track);
        }, [props.onAdd, props.track]
    );

    const removeTrack = useCallback(
        (event) => {
            props.onRemove(props.track);
        }, [props.onRemove, props.track]
    );

    const addOrRemoveTrack = () => {
        return (
            <button onClick={props.isRemoval ? removeTrack : addTrack}>
                {props.isRemoval ? '-' : '+'}
            </button>
        );
    };
 



    return(
        <div>
         <div>
         <h4>{props.track.name}</h4>
         <p>
            {props.track.artist} | {props.track.album}
         </p>
         </div>
         {addOrRemoveTrack()}   
        </div>
    );




};

export default Track;