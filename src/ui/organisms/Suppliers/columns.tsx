import { Column, TypeOfPayment } from 'utils';
import { useTranslation } from 'react-i18next';

export const handleColumns = (typeOfPaymentsList: TypeOfPayment[]) => {
  const { t } = useTranslation();

  let COLUMNS: Column[] = [];

  return (COLUMNS = [
    {
      name: t('tabella.suppliers.nome'),
      id: 'name',
    },
    {
      name: t('tabella.suppliers.note'),
      id: 'note',
    },
    {
      name: t('tabella.suppliers.tipo-di-pagamento'),
      id: 'typeOfPaymentId',
      transform: (value: any) => {
        for (const typeOfPayment of typeOfPaymentsList) {
          if (value === typeOfPayment.id) {
            return typeOfPayment.name;
          }
        }
      },
    },
  ]);
};
