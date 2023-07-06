import { Column } from 'utils';

export const COLUMNS: Column[] = [
  {
    name: 'Nome',
    id: 'name',
  },
  {
    name: 'Tipo di pagamento',
    id: 'typeOfPaymentId',
    transform: (value: any) =>
      value === 1
        ? '30 gg d.f.'
        : value === 2
        ? 'A vista'
        : value === 3
        ? '30-60 gg d.f.'
        : value === 4
        ? '30 gg f.m.'
        : '',
  },
  {
    name: 'Note',
    id: 'note',
  },
];
