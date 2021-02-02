import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
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

    let rowData = []
    props.results.map((ele, i) => rowData.push( 
      {Volunteer: ele.opportunity_id, 
      Website: ele.website, 
      Requirements: ele.requirements}
      ))


    return (
        <div className="ag-theme-alpine" style={ { height: 400, width: "100%" } }>
            <AgGridReact
                onGridReady={onGridReady}
                rowData={rowData}
                defaultColDef={defaultColDef}
                > 
                <AgGridColumn field="Volunteer"></AgGridColumn>
                <AgGridColumn field="Website"></AgGridColumn>
                <AgGridColumn field="Requirements"></AgGridColumn>
            </AgGridReact>
        </div>
    );
};

export default Table;