import { Column, Supplier } from 'utils';
import { useTranslation } from 'react-i18next';

export const handleColumns = (suppliersList: Supplier[]) => {
  const { t } = useTranslation();

  let COLUMNS: Column[] = [];

  return (COLUMNS = [
    {
      name: t('tabella.resources.nome'),
      id: 'firstName',
    },
    {
      name: t('tabella.resources.cognome'),
      id: 'lastName',
    },
    {
      name: t('tabella.resources.costo-orario'),
      id: 'hourCost',
      transform: (value: any) => `€ ${parseFloat(value).toFixed(2)}`,
    },
    {
      name: t('tabella.resources.ricavo-orario'),
      id: 'hourRevenue',
      transform: (value: any) => `€ ${parseFloat(value).toFixed(2)}`,
    },
    {
      name: t('tabella.resources.curriculumVitae'),
      id: 'curriculumVitae',
    },
    {
      name: t('tabella.resources.fornitore'),
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
      name: t('tabella.resources.note'),
      id: 'note',
    },
  ]);
};
