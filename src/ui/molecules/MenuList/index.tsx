import { useNavigate } from 'react-router-dom';
import { Li, TextElement } from 'ui';
import { SIDEBAR } from 'utils';
import { useTranslation } from 'react-i18next';
interface Props {
  name: string;
}

const MenuList = ({ name }: Props) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <ul style={{ paddingLeft: '30px' }}>
      {SIDEBAR.map((sidebar) =>
        sidebar.name === name
          ? sidebar.path?.map((subLink) => (
              <Li
                style={{ paddingBlock: '10px', borderRadius: '0', borderWidth: '0 0 0 2px' }}
                onClick={() => navigate(subLink.href)}
                current={location.pathname === subLink.href ? 'current' : 'notCurrent'}
                key={subLink.href}
              >
                <TextElement name={subLink.name} />
              </Li>
            ))
          : null,
      )}
    </ul>
  );
};
export default MenuList;
