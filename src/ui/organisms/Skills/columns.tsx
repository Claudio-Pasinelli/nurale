import { Column } from 'utils';
import { useTranslation } from 'react-i18next';

export const handleColumns = () => {
  const { t } = useTranslation();

  let COLUMNS: Column[] = [];
  return (COLUMNS = [
    {
      name: t('tabella.skills.nome'),
      id: 'name',
    },
    {
      name: t('tabella.skills.tipo-di-skill'),
      id: 'skillType',
    },
    {
      name: t('tabella.skills.note'),
      id: 'note',
    },
  ]);
};
