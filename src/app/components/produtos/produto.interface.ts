
export interface IProduto {
  id?: number;
  nome: string;
  descricao: string;
  tipo: string;
  marca: string;
  categoria: string;
  preco: number,
  data: Date | string;
}

export const EMPTY_PRODUTO: IProduto =  {
id: 0,
nome: '',
descricao: '',
tipo: 'Básico',
marca: '',
categoria: '',
preco: 0,
data: ''
}
