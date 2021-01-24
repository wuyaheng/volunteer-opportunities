import React from "react";

function OpportunitiesSelect({ results, handleOppChange }) {
    console.log(results)
    return (
        <div className="input-group mb-2">
            <select className="custom-select" id="inputGroupSelect02" onChange={handleOppChange}>
                {results.map((ele, i) => (
                    ele ? <option key={i + "-el"} value={ele.opportunity_id}>{ele.opportunity_id}</option> : null
                ))}
            </select>
        </div>
    )
}

export default OpportunitiesSelect; 