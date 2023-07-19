import { Flex, Stack, Switch } from '@chakra-ui/react';
import SidebarLink from '../SidebarLink';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';
import { Icons, Spacer, theme } from 'ui';
import { ROUTES, SIDEBAR, removeTokenCookies } from 'utils';
import i18n from 'i18n.config';
import { useTranslation } from 'react-i18next';
import { getUserRole } from 'store';
import { useSelector } from 'react-redux';

const Sidebar = () => {
  const { t } = useTranslation();

  const currentUserRole = useSelector(getUserRole);

  const [isItalianOn, setIsItalianOn] = useState(true);

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpen = (value = false) => {
    value ? setOpen(false) : setOpen(!open);
  };

  const logOut = () => {
    removeTokenCookies();
    navigate(ROUTES.login);
  };

  const handleChangeLanguage = () => {
    let lang;

    if (localStorage.getItem('lang') === 'it') {
      lang = 'en';
      localStorage.setItem('lang', lang);
      setIsItalianOn(false);
      return i18n.changeLanguage(lang);
    } else if (localStorage.getItem('lang') === 'en') {
      lang = 'it';
      localStorage.setItem('lang', lang);
      setIsItalianOn(true);
      return i18n.changeLanguage(lang);
    }
  };

  useEffect(() => {
    localStorage.getItem('lang') === 'it' ? setIsItalianOn(true) : setIsItalianOn(false);
  }, []);

  return (
    <Flex
      direction='column'
      height='100vh'
      width={open ? '3rem' : '16rem'}
      minWidth={open ? '3rem' : '13rem'}
      maxWidth={'16rem'}
      style={{
        boxShadow: '0 1px 8px rgba(81, 70, 137, 0.5)',
        borderRadius: '0 0 20px 0',
        zIndex: '10',
        padding: open ? '0 5px 0 5px' : '0 0 0 22px',
        boxSizing: 'content-box',
        placeContent: 'space-evenly',
      }}
    >
      <div style={{ padding: open ? '22px 0 22px 0' : '22px 22px 1.5rem 0px' }}>
        <Flex border='solid #514689' borderWidth='0 0 2px 0' direction='column'>
          {open ? <img src='./images/logo-piccolo.svg' /> : <img src='./images/login-titolo.svg' />}
          <Spacer width={'20px'} height={'20px'} />
        </Flex>
      </div>
      <div
        style={{
          position: 'absolute',
          left: open ? '2.75rem' : '14rem',
          top: '5rem',
          cursor: 'pointer',
        }}
        onClick={() => handleOpen()}
      >
        <Icons name={open ? 'triangoloDx' : 'triangoloSn'} size={1.5} maxHeight={1.5} />
      </div>
      <Flex
        direction='column'
        overflow='hidden auto'
        alignSelf='center'
        className='sidebarList'
        padding={open ? '0' : '0 10px 0 0'}
        width='100%'
        height='100%'
      >
        {currentUserRole === 'ADMIN'
          ? SIDEBAR.map((link) => (
              <div key={link.name + link.icon + link.href} onClick={() => handleOpen(true)}>
                <SidebarLink
                  // name={open ? '' : t(`${link.name}`)}
                  name={open ? '' : link.name}
                  nameIcon={link.icon}
                  dropdownVerification={link.dropdownVerification}
                  nameOtherIcon={open ? undefined : link.nameOtherIcon}
                  show={open}
                />
              </div>
            ))
          : currentUserRole === 'USER'
          ? SIDEBAR.slice(0, 2).map((link) => (
              <div key={link.name + link.icon + link.href} onClick={() => handleOpen(true)}>
                <SidebarLink
                  name={open ? '' : link.name}
                  nameIcon={link.icon}
                  dropdownVerification={link.dropdownVerification}
                  nameOtherIcon={open ? undefined : link.nameOtherIcon}
                  show={open}
                />
              </div>
            ))
          : null}
      </Flex>
      <Flex direction='column' padding={open ? '0 0 22px 0' : '0 22px 22px 0'}>
        <div style={{ border: 'solid #514689', borderWidth: '2px 0 0 0' }}>
          <Spacer width={'20px'} height={'25px'} />
          <Flex onClick={logOut} cursor='pointer' placeContent={open ? 'center' : 'none'}>
            <Icons name='logout' size={1.5} />
            {open ? null : (
              <span style={{ padding: '0 1.3rem', fontWeight: theme.fontWeights.bold }}>
                Logout
              </span>
            )}
          </Flex>
          <Spacer width={'20px'} height={'25px'} />
          <Flex cursor='pointer' placeContent={open ? 'center' : 'none'}>
            <Icons name='darkMode' size={1.5} />
            {open ? null : (
              <Flex>
                <span style={{ padding: '0 1.3rem', fontWeight: theme.fontWeights.bold }}>
                  Dark Mode
                </span>
                <Stack align='center' direction='row'>
                  <Switch size='md' />
                </Stack>
              </Flex>
            )}
          </Flex>
          <Flex cursor='pointer' placeContent={open ? 'center' : 'none'}>
            {open ? null : (
              <Flex>
                <span style={{ padding: '0 1.3rem 0 0', fontWeight: theme.fontWeights.bold }}>
                  {isItalianOn ? 'Italiano' : 'English'}
                </span>
                <Stack align='center' direction='row' justifyContent='space-between'>
                  <Switch size='md' onChange={handleChangeLanguage} />
                </Stack>
              </Flex>
            )}
          </Flex>
        </div>
      </Flex>
    </Flex>
  );
};
export default Sidebar;
