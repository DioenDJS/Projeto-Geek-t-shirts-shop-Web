import React from 'react';

const SearchInput = ({value, onChange }) => {

    function handleChange(event){
        onChange(event.target.value);
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark">
            <form className="form-inline w-100 " >
                <input 
                    className="form-control mr-sm-2 w-75" 
                    type="search" 
                    value={value} 
                    onChange={handleChange} 
                    placeholder="Search" 

                />
                <button className="btn btn-success " type="submit">Search</button>
            </form>
        </nav>
    );
};

export default SearchInput;