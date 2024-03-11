import React from 'react';

import TrackList from '../tracklist/tracklist';

const SearchResults = (props) => {
    return (
        <div>
            <h5>Results</h5>
            <TrackList tracks={props.SearchResults} onAdd={props.onAdd} />
        </div>
    )
}

export default SearchResults;