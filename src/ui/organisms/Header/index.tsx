import { Flex, Spacer } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUserFirstName, getUserLastName, fetchMe, useAppDispatch } from 'store';
import { Icons } from 'ui/atoms';
import { ROUTES, SIDEBAR, removeTokenCookies } from 'utils';
import useOnClickOutside from 'utils/hooks/useOnClickOutside';
import { darkModePalette } from 'ui/themes/colors';
import { theme } from 'ui/themes';

const Header = () => {
  const location = useLocation();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const ref = useRef<any>();

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const firstName = useSelector(getUserFirstName);
  const lastName = useSelector(getUserLastName);

  const handleClick = async () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const logOut = () => {
    removeTokenCookies();
    navigate(ROUTES.login);
  };

  useOnClickOutside(ref, handleClick);

  useEffect(() => {
    dispatch(fetchMe());
  }, []);

  return (
    <Flex
      direction='row'
      alignItems='center'
      height='48.5px'
      borderBottomRightRadius='2rem'
      boxShadow='rgba(81, 70, 137, 0.3) 0px 2px 6px'
    >
      <Flex height='100%' width='100%'>
        <Flex
          style={{
            height: '100%',
            width: '100%',
            background:
              'linear-gradient(90deg, rgb(239, 66, 111) 0%, rgb(81, 70, 137) 26.06%, rgba(0, 0, 0, 0) 51.87%)',
          }}
        >
          <p
            style={{
              color: 'white',
              marginBlock: 'auto',
              marginLeft: '1.375rem',
              fontSize: theme.fontSizes.xs,
              fontWeight: theme.fontWeights.bold,
            }}
          >
            {SIDEBAR.map((sidebarLink) =>
              sidebarLink.href === location.pathname
                ? sidebarLink.name
                : sidebarLink.path?.map((sidebarSubLink) =>
                    sidebarSubLink.href === location.pathname ? sidebarSubLink.name : null,
                  ),
            )}
          </p>
        </Flex>
      </Flex>
      <Flex padding='0.5rem 1rem'>
        <div style={{ marginRight: '2rem' }}>
          <Icons name='notifiche' size={1.75} color='rgba(81, 70, 137, 0.7)' />
        </div>
        <div onClick={handleClick}>
          <Icons
            name='profilo'
            size={1.75}
            color={isProfileOpen ? darkModePalette.pink100 : 'rgba(81, 70, 137, 0.7)'}
          />
        </div>
        {isProfileOpen ? (
          <Flex
            width='18rem'
            padding='1.25rem 1.3rem'
            position='absolute'
            top='6.5%'
            right='0'
            backgroundColor={darkModePalette.main2}
            direction='column'
            boxShadow='rgba(81, 70, 137, 0.3) -0.2rem 0.2rem 0.4rem'
            borderRadius='0.8rem'
            zIndex={100000}
            marginRight='0.5rem'
            overflow='hidden'
            ref={ref}
          >
            <Flex>
              <Flex
                fontSize={theme.fontSizes.xs}
                fontWeight={theme.fontWeights.medium}
                width='2.5rem'
                height='2.5rem'
                alignItems='center'
                justifyContent='space-around'
                borderRadius='100%'
                backgroundColor={darkModePalette.pink100}
              >
                <p>{`${firstName?.substring(0, 1)}${lastName?.substring(0, 1)}`}</p>
              </Flex>
              <Flex
                marginLeft='0.5rem'
                alignSelf='center'
                fontSize={theme.fontSizes.xxs}
                fontWeight={theme.fontWeights.bold}
              >
                <p>{`${firstName} ${lastName}`}</p>
              </Flex>
            </Flex>
            <Spacer
              width='100%'
              height='20px'
              style={{ border: 'solid rgba(123, 97, 255, 0.05)', borderWidth: '0 0 0.2rem 0' }}
            />
            <Spacer width='100%' height='20px' />
            <Flex
              onClick={logOut}
              cursor='pointer'
              placeContent='center'
              justifyContent='left'
              width='fit-content'
            >
              <Icons name='logout' size={1.5} />
              <span style={{ padding: '0 1.3rem', fontWeight: theme.fontWeights.bold }}>
                Logout
              </span>
            </Flex>
          </Flex>
        ) : null}
      </Flex>
    </Flex>
  );
};

export default Header;
