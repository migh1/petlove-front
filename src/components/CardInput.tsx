/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import useRequest from '../hooks/useRequest';
import '../styles/CardInput.css';

interface CardInputProps {
  dispatch: any;
}

const CardInput: React.FC<CardInputProps> = ({ dispatch }) => {
  const [cep, setCep] = useState<string>('');
  const { _get, response, error } = useRequest();

  const sanitizeCep = (value: string) => value.replace(/\D/g, '');

  const addCepMask = (value: string) => {
    const newValue = value.split('');
    newValue.splice(5, 0, '-');
    return newValue.join('');
  };

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    const sanitizedValue = sanitizeCep(value);

    if (sanitizedValue.length <= 8) {
      if (sanitizedValue.length >= 6) {
        setCep(addCepMask(sanitizedValue));
      } else {
        setCep(sanitizedValue);
      }
    }
  };

  const onClickHandler = () => {
    if (sanitizeCep(cep).length < 8) {
      alert('Digite um CEP válido!');
      return;
    }
    doCepFetch();
  };

  const doCepFetch = () => {
    _get(`/cep/${cep}`);
  };

  useEffect(() => {
    if (cep.length === 9) {
      doCepFetch();
    }
  }, [cep]);

  useEffect(() => {
    if (response) {
      dispatch({ type: 'viacep_success', payload: response });
    }
  }, [dispatch, response]);

  useEffect(() => {
    if (error) {
      dispatch({ type: 'viacep_error' });
    }
  }, [error]);

  return (
    <div id='card-input'>
      <div className='container'>
        <div className='card'>
          <input
            className='form-input'
            type='text'
            id='cep-input'
            placeholder='00000-000'
            value={cep}
            onChange={onChangeHandler}
          />
          <button onClick={onClickHandler} className='btn'>
            Buscar CEP
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardInput;
