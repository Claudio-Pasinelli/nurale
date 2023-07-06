import { Icons } from 'ui';
import { darkModePalette } from 'ui/themes/colors';
import { Column } from 'utils';

export const COLUMNS: Column[] = [
  {
    name: 'Nome',
    id: 'name',
  },
  {
    name: 'Giorni al primo pagamento',
    id: 'daysToFirstPayment',
  },
  {
    name: 'Giorni tra i pagamenti',
    id: 'daysBetweenPayments',
  },
  {
    name: 'Numero di pagamenti',
    id: 'numberOfPayments',
  },
  {
    name: 'Spostare i pagamenti alla fine del mese',
    id: 'movePaymentsToTheEndOfMonth',
    transform: (value: any) =>
      value === true ? (
        <Icons name='trueIcon' color={darkModePalette.main2} size={1.5} />
      ) : (
        <Icons name='falseIcon' color={darkModePalette.main2} size={1.5} />
      ),
  },
  {
    name: 'Note',
    id: 'note',
  },
];
