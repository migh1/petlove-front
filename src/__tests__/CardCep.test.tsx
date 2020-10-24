import React from 'react';
import CardCep from '../components/CardCep';
import { render, cleanup, queryByTestId } from '@testing-library/react';

window.alert = jest.fn();

const viacep = {
  cep: '13566-560',
  logradouro: 'Alameda das Rosas',
  localidade: 'São Carlos',
  uf: 'SP',
};

const emptyViacep = {
  cep: '',
  logradouro: '',
  localidade: '',
  uf: '',
};

afterEach(cleanup);

describe('<CardCep />', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('CardCep deve renderizar', () => {
    const { container } = render(<CardCep viacep={viacep} />);

    const card = queryByTestId(container, 'card-cep');

    expect(container).toBeInTheDocument();
    expect(card).toBeInTheDocument();
  });

  test('CardCep não deve renderizar se não possui cep', () => {
    const { container } = render(<CardCep viacep={emptyViacep} />);

    const card = queryByTestId(container, 'card-cep');

    expect(container).toBeInTheDocument();
    expect(card).not.toBeInTheDocument();
  });

  test('Card deve renderizar', () => {
    const { getByTestId } = render(<CardCep viacep={viacep} />);

    const card = getByTestId('card-cep');

    expect(card).toBeInTheDocument();
  });

  test('Cep deve renderizar com valor', () => {
    const { getByTestId } = render(<CardCep viacep={viacep} />);

    const cep = getByTestId('span-cep');

    expect(cep).toBeInTheDocument();
    expect(cep).toHaveTextContent('CEP: 13566-560');
  });

  test('Estado deve renderizar com valor', () => {
    const { getByTestId } = render(<CardCep viacep={viacep} />);

    const uf = getByTestId('span-uf');

    expect(uf).toBeInTheDocument();
    expect(uf).toHaveTextContent('SP');
  });

  test('Cidade deve renderizar com valor', () => {
    const { getByTestId } = render(<CardCep viacep={viacep} />);

    const localidade = getByTestId('span-localidade');

    expect(localidade).toBeInTheDocument();
    expect(localidade).toHaveTextContent('Cidade: São Carlos');
  });

  test('Logradouro deve renderizar com valor', () => {
    const { getByTestId } = render(<CardCep viacep={viacep} />);

    const logradouro = getByTestId('span-logradouro');

    expect(logradouro).toBeInTheDocument();
    expect(logradouro).toHaveTextContent('Logradouro: Alameda das Rosas');
  });
});
