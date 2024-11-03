export interface InserirContatoViewModel {
  nome: string;
  email: string;
  telefone: string;
  empresa: string;
  cargo: string;
}

export interface ContatoInseridoViewModel {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  empresa: string;
  cargo: string;
}

export interface EditarContatoViewModel {
  nome: string;
  email: string;
  telefone: string;
  empresa: string;
  cargo: string;
}

export interface ContatoEditadoViewModel {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  empresa: string;
  cargo: string;
}

export interface ContatoExcluidoViewModel {}

export interface ListarContatoViewModel {
  id: string;
  nome: string;
  // email: string;
  telefone: string;
  empresa: string;
  cargo: string;
}

export interface VisualizarContatoViewModel {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  empresa: string;
  cargo: string;
}
