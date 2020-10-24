import React from 'react';
import axios from 'axios';
import CardInput from '../components/CardInput';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

window.alert = jest.fn();

const data = {
  data: {
    cep: '13566-560',
    logradouro: 'Alameda das Rosas',
    localidade: 'São Carlos',
    uf: 'SP',
  },
};

afterEach(cleanup);

describe('<CardInput />', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('CardInput deve renderizar', () => {
    const { container } = render(<CardInput dispatch={jest.fn()} />);

    expect(container).toBeInTheDocument();
  });

  test('Input deve renderizar', () => {
    const { getByTestId } = render(<CardInput dispatch={jest.fn()} />);

    const input = getByTestId('cep-input');

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', '00000-000');
    expect(input).toHaveValue('');
  });

  test('Botão deve renderizar', () => {
    const { getByTestId } = render(<CardInput dispatch={jest.fn()} />);

    const button = getByTestId('cep-button');

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Buscar CEP');
  });

  test('Input com menos de 6 dígitos deve renderizar sem máscara de cep', () => {
    const { getByTestId } = render(<CardInput dispatch={jest.fn()} />);

    const input = getByTestId('cep-input');

    fireEvent.change(input, {
      target: {
        value: '13566',
      },
    });

    expect(input).toHaveValue('13566');
  });

  test('Input com 6 ou mais dígitos deve renderizar com máscara de cep', async () => {
    (axios.get as jest.Mocked<any>).mockResolvedValue({ data });

    const { getByTestId } = render(<CardInput dispatch={jest.fn()} />);

    const input = getByTestId('cep-input');

    await act(async () => {
      fireEvent.change(input, {
        target: {
          value: '13566560',
        },
      });
    });

    expect(input).toHaveValue('13566-560');
  });

  test('Input com mais de 8 dígitos deve renderizar vazio', async () => {
    (axios.get as jest.Mocked<any>).mockResolvedValue({ data });

    const { getByTestId } = render(<CardInput dispatch={jest.fn()} />);

    const input = getByTestId('cep-input');

    await act(async () => {
      fireEvent.change(input, {
        target: {
          value: '1356656011111',
        },
      });
    });

    expect(input).toHaveValue('');
  });

  test('Ao clicar com botão quando input tiver menos que 8 dígitos, aparecer alerta', () => {
    const { getByTestId } = render(<CardInput dispatch={jest.fn()} />);

    const input = getByTestId('cep-input');
    const button = getByTestId('cep-button');

    fireEvent.change(input, {
      target: {
        value: '1356656',
      },
    });

    fireEvent.click(button);

    expect(window.alert).toHaveBeenCalledTimes(1);
  });

  test('Ao clicar com botão quando input tiver 8 dígitos, não aparecer alerta', async () => {
    (axios.get as jest.Mocked<any>).mockResolvedValue({ data });

    const { getByTestId } = render(<CardInput dispatch={jest.fn()} />);

    const input = getByTestId('cep-input');
    const button = getByTestId('cep-button');

    await act(async () => {
      fireEvent.change(input, {
        target: {
          value: '13566560',
        },
      });
    });
    await act(async () => {
      fireEvent.click(button);
    });

    expect(input).toHaveValue('13566-560');
    expect(window.alert).toHaveBeenCalledTimes(0);
  });

  test('Deve receber resposta de erro do endpoint para cep inválido', async () => {
    (axios.get as jest.Mocked<any>).mockRejectedValue(new Error('Async error'));

    const { getByTestId } = render(<CardInput dispatch={jest.fn()} />);

    const input = getByTestId('cep-input');
    const button = getByTestId('cep-button');

    await act(async () => {
      fireEvent.change(input, {
        target: {
          value: '18460000',
        },
      });
    });
    await act(async () => {
      fireEvent.click(button);
    });

    expect(input).toHaveValue('18460-000');
    expect(window.alert).toHaveBeenCalledTimes(0);
  });
});
