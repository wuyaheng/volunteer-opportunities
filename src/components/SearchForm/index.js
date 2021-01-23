import React from "react";

function SearchForm({ results, handleInputChange }) {
    return (
        <div className="input-group mb-2">
            <select className="custom-select" id="inputGroupSelect01" onChange={handleInputChange}>
                {results.sort(function(a, b) {
                    if(a.toLowerCase() < b.toLowerCase()) return -1;
                    if(a.toLowerCase() > b.toLowerCase()) return 1;
                    return 0;
                    }).map((ele, i) => (
                    ele ? <option key={i + "-el"} value={ele}>{ele}</option> : null
                ))}
            </select>
        </div>
    )
}

export default SearchForm; 