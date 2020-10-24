import React from 'react';
import { Viacep } from '../reducer/reducer';
import '../styles/CardCep.css';

interface CardCepProps {
  viacep: Viacep;
}

const CardCep: React.FC<CardCepProps> = ({ viacep }) => {
  if (!viacep.cep) return null;

  return (
    <div id='card-cep'>
      <div className='container'>
        <div className='card'>
          <span>
            <strong>CEP: </strong>
            {viacep.cep}
          </span>
          <br />
          <span>
            <strong>Estado: </strong>
            {viacep.uf}
          </span>
          <br />
          <span>
            <strong>Cidade: </strong>
            {viacep.localidade}
          </span>
          <br />
          <span>
            <strong>Logradouro: </strong>
            {viacep.logradouro}
          </span>
          <br />
        </div>
      </div>
    </div>
  );
};

export default CardCep;
