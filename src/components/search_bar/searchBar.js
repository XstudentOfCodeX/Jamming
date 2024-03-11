import React, { useState, useCallback } from 'react';


const SearchBar = (props) => {
    const [term, setTerm] = useState("");

    const handleTermChange = useCallback(
        (event) => {
        setTerm(event.target.value);
    }, []
    );

    const search = useCallback(
        () => {
            props.onSearch(term);
    }, [props.onSearch, term]
    );

    return (
        <div>
            <input onChange={handleTermChange}/>
            <button onClick={search}>
                Search a Song Title
            </button>
        </div>
    );
}

export default SearchBar;