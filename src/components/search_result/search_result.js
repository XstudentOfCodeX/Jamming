import React from 'react';
import './search_result.css';
import TrackList from '../tracklist/tracklist';

const SearchResults = (props) => {
    return (
        <div className='Results'>
            <h2>Results</h2>
            <TrackList tracks={props.searchResults} onAdd={props.onAdd} isRemoval={false}/>
        </div>
    )
}

export default SearchResults;