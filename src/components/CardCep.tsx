import React from 'react';
import { Viacep } from '../reducer/reducer';
import '../styles/CardCep.css';

interface CardCepProps {
  viacep: Viacep;
}

const CardCep: React.FC<CardCepProps> = ({ viacep }) => {
  if (!viacep.cep) return null;

  return (
    <div id='card-cep' data-testid='card-cep'>
      <div className='container'>
        <div className='card'>
          <span data-testid='span-cep'>
            <strong>CEP: </strong>
            {viacep.cep}
          </span>
          <br />
          <span data-testid='span-uf'>
            <strong>Estado: </strong>
            {viacep.uf}
          </span>
          <br />
          <span data-testid='span-localidade'>
            <strong>Cidade: </strong>
            {viacep.localidade}
          </span>
          <br />
          <span data-testid='span-logradouro'>
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
