import React, { useState } from 'react';
import { render } from 'react-dom';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const Table = (props) => {
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);

    function onGridReady(params) {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);
        params.api.sizeColumnsToFit(); 
    }
 
      let defaultColDef = {
        flex: 1,
        resizable: true,
        sortable: true,
        wrapText: true,
        autoHeight: true
      }

    let removeHTML= (s) => {
      if (typeof s !== "string") return s
      return s.replaceAll(/<[^>]*>/g, "").replace(/&nbsp;/g, ' ');
    }

    let rowData = []
    props.results.map((ele, i) => rowData.push( 
      {Volunteer: ele.opportunity_id, 
       Website: ele.website, 
       Requirements: removeHTML(ele.requirements)}
      ))


    let columnDefs = [
      {
        field: 'Volunteer',
        headerName: 'Volunteer',
        cellRenderer: function(params) {
          return params.data.Volunteer;
        },
        flex: 1,
      },
      {
        field: 'Website',
        headerName: 'Website',
        cellRenderer: function(params) {
          let keyData = params.data.Website;
          let newLink = `<a href= ${keyData} target="_blank">${keyData}</a>`;

          return newLink;
        },
        flex: 1,
      },
      {
        field: 'Requirements',
        headerName: 'Requirements',
        cellRenderer: function(params) {
          return params.data.Requirements;
        },
        flex: 1,
      }]

    return (
        <div className="ag-theme-alpine" style={ { height: 400, width: "100%" } }>
            <AgGridReact
                onGridReady={onGridReady}
                rowData={rowData}
                defaultColDef={defaultColDef}
                columnDefs={columnDefs}
                > 
                <AgGridColumn field="Volunteer"></AgGridColumn>
                <AgGridColumn field="Website"></AgGridColumn>
                <AgGridColumn field="Requirements"></AgGridColumn>
            </AgGridReact>
        </div>
    );
};

export default Table;