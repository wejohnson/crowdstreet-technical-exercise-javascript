import React from 'react';
import TableContainer from './TableContainer';
import ConfigureBox from './ConfigureBox';
import './App.css';
import { StateProvider } from './Store.js';

function App() {
  // TODO: client side stickiness
  return (
    <StateProvider>
      <div className="App">
        <div className='table-section'>
          <TableContainer className='red-table' />
          <TableContainer className='green-table' />
          <TableContainer className='blue-table' />
        </div>
        <ConfigureBox />
      </div>
    </StateProvider>
  );
}

export default App;
