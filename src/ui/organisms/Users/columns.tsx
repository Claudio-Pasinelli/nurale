import { Column } from 'utils';
import { useTranslation } from 'react-i18next';

export const handleColumns = () => {
  const { t } = useTranslation();

  let COLUMNS: Column[] = [];

  return (COLUMNS = [
    {
      name: t('tabella.users.nome'),
      id: 'firstName',
    },
    {
      name: t('tabella.users.cognome'),
      id: 'lastName',
    },
    {
      name: t('tabella.users.email'),
      id: 'email',
    },
  ]);
};
