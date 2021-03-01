import React from "react";

function OpportunitiesSelect({ results, handleOppChange }) {
    console.log(results)
    return (
        <div className="input-group pl-2 pr-2">
            <select className="custom-select" id="inputGroupSelect02" onChange={handleOppChange}>
                <option value="All Volunteer Opportunities" selected="selected">All Volunteer Opportunities</option>
                {results.map((ele, i) => (
                    ele.opportunity_id ? <option key={i + "-el"} value={ele.opportunity_id}>{ele.opportunity_id}</option> : null
                ))}
            </select>
        </div>
    )
}

export default OpportunitiesSelect; 