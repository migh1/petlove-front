import React, { useReducer } from 'react';
import { initialState, reducer } from './reducer/reducer';
import CardCep from './components/CardCep';
import CardInput from './components/CardInput';

import './app.css';

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className='container'>
      <CardInput dispatch={dispatch} />
      <CardCep viacep={state.viacep} />
    </div>
  );
}

export default App;
