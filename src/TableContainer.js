import React, { useContext } from 'react';
import { store } from './Store.js';
import Table from './Table';

import './TableContainer.css';

function TableContainer(props) {
  const { state, dispatch } = useContext(store);

  let className = 'table-container ' + props.className;
  let tableColor = props.className.split('-')[0];
  let tableSettings = state[props.className.split('-')[0]];
  let width = tableSettings.W + '%';

  const toggleConfigureBox = () => {

    if (tableColor !== state.configureBoxOpened) {
      state.configureBoxOpened = tableColor;
    } else {
      state.configureBoxOpened = 'none'
    }
    
    dispatch({type: 'UPDATE_STATE', payload: state})
  }

  // TODO: Prevent objects from resizing depending on table size

  return (
        <div className = {className} style={{width:width}}> 
            <Table tableColor={tableColor}/>
            <button className='configure-button' onClick={toggleConfigureBox}>Configure</button>
            <div className='percent-display'>{ tableSettings.W }%</div>
        </div>
  );
}

export default TableContainer;