export interface Viacep {
  cep: string;
  logradouro: string;
  localidade: string;
  uf: string;
}

interface ReducerState {
  viacep: Viacep;
}

export const initialState = {
  viacep: { cep: '', logradouro: '', localidade: '', uf: '' },
};

export function reducer(state: ReducerState, action: any) {
  switch (action.type) {
    case 'viacep_success': {
      return {
        ...state,
        viacep: action.payload,
      };
    }
    case 'viacep_error': {
      return {
        ...state,
        viacep: initialState.viacep,
      };
    }
    default:
      throw new Error();
  }
}
