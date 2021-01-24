import React from "react";


function Table(props) {
  
  return (
        <div className="card">
        <table class="table table-hover">
        <thead>
            <tr>
            <th scope="col">Volunteer Opportunity</th>
            <th scope="col">Website</th>
            <th scope="col">Requirements</th>
            </tr>
        </thead>
        <tbody>
            {props.results.map((ele, i) => <tr><td>{ele.opportunity_id}</td><td>{ele.website}</td><td>{ele.requirements}</td></tr>)}
        </tbody>
        </table>

        </div>
  );
}

export default Table;
