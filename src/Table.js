import React, { useContext, useEffect } from 'react';
import { store } from './Store.js';

import './Table.css';

function Table(props) {
    const { state } = useContext(store);
    
    let tableSpecs = state[props.tableColor];

    let tableRows = [
        [{"td":""},{"td":""},{"td":""},{"td":""},{"td":""}],
        [{"td":""},{"td":""},{"td":""},{"td":""},{"td":""}],
        [{"td":""},{"td":""},{"td":""},{"td":""},{"td":""}],
        [{"td":""},{"td":""},{"td":""},{"td":""},{"td":""}],
        [{"td":""},{"td":""},{"td":""},{"td":""},{"td":""}],
    ];

    let tableID = props.tableColor + '-table';

    const calculateTableValues = () => {
        /* There has to be a cleverer way to do this */
        tableSpecs = state[props.tableColor];
        var currentValue = tableSpecs.N;

        if (tableSpecs.D === 'LTR-UP') {
            for (let i = 4; i >= 0; i--) {
                for (let j = 0; j < 5; j++) {
                    tableRows[i][j]['td'] = currentValue;
                    currentValue += tableSpecs.X;
                    if (currentValue > tableSpecs.M) {
                        return;
                    }
                }
            }
        } else {
            for (let i = 4; i >= 0; i--) {
                for (let j = 4; j >= 0 ; j--) {
                    tableRows[i][j]['td'] = currentValue;
                    currentValue += tableSpecs.X;
                    if (currentValue > tableSpecs.M) {
                        return;
                    }
                }
            }
        }
        
    };

    /* quick and dirty way to eliminate empty rows */
    const cleanTable = () => {
        const isEmpty = (currentValue) => JSON.stringify(currentValue) === JSON.stringify({"td":""})
        
        var i = 0;
        while (i < tableRows.length) {
            if (tableRows[i].every(isEmpty)) {
                tableRows.splice(i,1);
            }
            else {
                i++;
            }  
        }
    }

    const generateTable = () => {
        /*
            https://stackoverflow.com/a/29930449/1546719
        */
        var table = document.getElementById(tableID);
        table.innerHTML = '';
        for(var rowIndex in tableRows) {
            var row = document.createElement("tr");
            for(var colIndex in tableRows[rowIndex]) {
                for(var tag in tableRows[rowIndex][colIndex]) {
                    var cell = document.createElement(tag);
                    var cellContents = document.createTextNode(tableRows[rowIndex][colIndex][tag]);
                    cell.appendChild(cellContents);
                    row.appendChild(cell);
                }
            }
            table.appendChild(row);
        }
    };

    

    useEffect(() => {
        calculateTableValues();
        cleanTable();
        generateTable();
    });

    

  return (
        <table id={tableID} className='table-area' />
  );
}

export default Table;