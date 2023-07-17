import { Column } from 'utils';
import { useTranslation } from 'react-i18next';
import { darkModePalette } from 'ui/themes/colors';
import { Icons } from 'ui';

export const handleColumns = () => {
  const { t } = useTranslation();

  let COLUMNS: Column[] = [];
  return (COLUMNS = [
    {
      name: t('tabella.typeOfPayments.nome'),
      id: 'name',
    },
    {
      name: t('tabella.typeOfPayments.giorni-al-primo-pagamento'),
      id: 'daysToFirstPayment',
    },
    {
      name: t('tabella.typeOfPayments.giorni-tra-i-pagamenti'),
      id: 'daysBetweenPayments',
    },
    {
      name: t('tabella.typeOfPayments.numero-di-pagamenti'),
      id: 'numberOfPayments',
    },
    {
      name: t('tabella.typeOfPayments.spostare-i-pagamenti-alla-fine-del-mese'),
      id: 'movePaymentsToTheEndOfMonth',
      transform: (value: any) =>
        value === true ? (
          <Icons name='trueIcon' color={darkModePalette.main2} size={1.5} />
        ) : (
          <Icons name='falseIcon' color={darkModePalette.main2} size={1.5} />
        ),
    },
    {
      name: t('tabella.typeOfPayments.note'),
      id: 'note',
    },
  ]);
};
