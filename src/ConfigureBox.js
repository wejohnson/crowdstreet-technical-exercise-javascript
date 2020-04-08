import React, { useContext, useRef }from 'react';
import { store } from './Store.js';

import './ConfigureBox.css';

function ConfigureBox() {
    const { state, dispatch } = useContext(store);
    const NRef = useRef(null);
    const XRef= useRef(null);
    const MRef = useRef(null);
    const WRef = useRef(null);
    const DRef = useRef(null);
    let boxOpened = state['configureBoxOpened'];
    let settings = state[boxOpened];
    
    const onChange = (e) => {
        state[boxOpened].N = e.target.value;
    }

    // TODO: Display errors on form instead of in alert boxes. 
    // TODO: More validation
    const isInputValid = () => {
        if (NRef.current.value === '') {
            alert('Please enter a valid value for N');
        }
        if (XRef.current.value === '') {
            alert('Please enter a valid value for X');
        }
        if (MRef.current.value === '') {
            alert('Please enter a valid value for M');
        }
        if (WRef.current.value === '') {
            alert('Please enter a valid value for W');
        }

        if (parseInt(NRef.current.value) > parseInt(MRef.current.value)) {
            alert('N must be less than M')
        }
    }

    const onOKButtonClick = () => {
        if (isInputValid()) {
            state[boxOpened].N = parseInt(NRef.current.value);
            state[boxOpened].X = parseInt(XRef.current.value);
            state[boxOpened].M = parseInt(MRef.current.value);
            state[boxOpened].W = parseInt(WRef.current.value);
            state[boxOpened].D = DRef.current.value;
            dispatch({type: 'UPDATE_STATE', payload: state});
        }
    }

    const onCancelButtonClick = () => {
        state.configureBoxDisplayed = false;
        dispatch({type: 'UPDATE_STATE', payload: state});
    }

    return (
            state.configureBoxDisplayed ? 
            // TODO: Change this to a form
            <div className='configure-box'>
                <div>Table: <span className={`${boxOpened}-table-header`}>{ state.configureBoxOpened.toUpperCase() }</span></div>
                <div>
                    <div className='input-label'>N = </div> 
                    <input defaultValue={ settings.N } onChange={onChange} ref={NRef} required/>
                </div>
                <div>
                    <div className='input-label'>X = </div>
                    <input defaultValue={ settings.X } onChange={onChange} ref={XRef} required/>
                </div>
                <div>
                    <div className='input-label'>M = </div>
                    <input defaultValue={ settings.M } onChange={onChange} ref={MRef} required/>
                </div>
                <div>
                    <div className='input-label'>W = </div>
                    <input defaultValue={ settings.W } onChange={onChange} ref={WRef} required/>%
                </div>
                <div>
                    <div className='input-label'>D = </div>
                    <select id="cars" onChange={onChange} ref={DRef}> 
                        <option value="LTR-UP">LTR-UP</option>
                        <option value="RTL-UP">RTL-UP</option>
                    </select>
                </div>

                <button onClick={onOKButtonClick}>OK</button>
                <button onClick={onCancelButtonClick}>Cancel</button>

            </div> : ''
    );
}

export default ConfigureBox;