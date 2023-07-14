import { Column, suppliersList } from 'utils';

export const COLUMNS: Column[] = [
  {
    name: 'Nome',
    id: 'firstName',
  },
  {
    name: 'Cognome',
    id: 'lastName',
  },
  {
    name: 'Costo Or.',
    id: 'hourCost',
    transform: (value: any) => `€ ${parseFloat(value).toFixed(2)}`,
  },
  {
    name: 'Ricavo Or.',
    id: 'hourRevenue',
    transform: (value: any) => `€ ${parseFloat(value).toFixed(2)}`,
  },
  {
    name: 'CV',
    id: 'curriculumVitae',
  },
  {
    name: 'Fornitore',
    id: 'supplierId',
    transform: (value: any) => {
      for (const supplier of suppliersList) {
        if (value === supplier.id) {
          return supplier.name;
        }
      }
    },
  },
  {
    name: 'Note',
    id: 'note',
  },
];
