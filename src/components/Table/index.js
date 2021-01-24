import React from "react";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';


function Table(props) {
  
  return (
        <div className="card">
        <table class="table table-hover">
        <thead>
            <tr>
            <th scope="col" width="30%">Volunteer Opportunity</th>
            <th scope="col" width="30%">Website</th>
            <th scope="col" width="40%">Requirements</th> 
            </tr>
        </thead>
        <tbody>
            {props.results.map((ele, i) => <tr><td>{ele.opportunity_id}</td><td><a href={ele.website} rel='noopener noreferrer' target='_blank'>{ele.website}</a></td><td> {ReactHtmlParser(ele.requirements)}</td></tr>)} 
        </tbody>
        </table>

        </div>
  );
}

export default Table;
