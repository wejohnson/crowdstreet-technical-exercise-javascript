import React, {createContext, useReducer} from 'react';

const initialState = {
    red: {
        N: 8,
        X: 1,
        M: 29,
        W: 20,
        D: 'LTR-UP',
    },
    green: {
        N: 231,
        X: 1,
        M: 247,
        W: 30,
        D: 'LTR-UP',
    },
    blue: {
        N: 47,
        X: 2,
        M: 81,
        W: 40,
        D: 'RTL-UP',
    },
    configureBoxOpened: 'none',
};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ( { children } ) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch(action.type) {
      case 'UPDATE_STATE':
        const newState = {...state}
        return newState;
      default:
        throw new Error();
    };
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider }