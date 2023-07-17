import { Column, TypeOfPayment } from 'utils';
import { useTranslation } from 'react-i18next';

export const handleColumns = (typeOfPaymentsList: TypeOfPayment[]) => {
  const { t } = useTranslation();

  let COLUMNS: Column[] = [];

  return (COLUMNS = [
    {
      name: t('tabella.customers.nome'),
      id: 'name',
    },
    {
      name: t('tabella.customers.tipo-di-pagamento'),
      id: 'typeOfPaymentId',
      transform: (value: any) => {
        for (const typeOfPayment of typeOfPaymentsList) {
          if (value === typeOfPayment.id) {
            return typeOfPayment.name;
          }
        }
      },
    },
    {
      name: t('tabella.customers.note'),
      id: 'note',
    },
  ]);
};
