import { Column } from 'utils';
import { useTranslation } from 'react-i18next';

export const handleColumns = () => {
  const { t } = useTranslation();

  let COLUMNS: Column[] = [];

  return (COLUMNS = [
    {
      name: t('tabella.resource-skills.risorsa'),
      id: 'resource.name',
    },
    {
      name: t('tabella.resource-skills.skill'),
      id: 'skill.name',
    },
    {
      name: t('tabella.resource-skills.livello'),
      id: 'level',
    },
    {
      name: t('tabella.resource-skills.note'),
      id: 'note',
    },
  ]);
};
