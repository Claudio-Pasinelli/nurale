import { Flex } from '@chakra-ui/react';
import { Icons, Spacer } from '../../atoms';
import { theme } from '../../themes';
import { useEffect, useState } from 'react';
import { darkModePalette } from '../../themes/colors';
import { ROUTES } from '../../../utils';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { EMAIL } from '../../../utils/costants/auth';
import { useAppDispatch } from '../../../store/applicationStore';
import { fetchMe, getUserFirstName, getUserLastName } from '../../../store/user';
import { useSelector } from 'react-redux';

interface Props {
  name?: string;
}

const Header = ({ name }: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [profileIconColor, setProfileIconColor] = useState('rgba(81, 70, 137, 0.7)');
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const firstName = useSelector(getUserFirstName);
  const lastName = useSelector(getUserLastName);

  const handleClick = async () => {
    setIsProfileOpen(!isProfileOpen);

    if (profileIconColor === 'rgba(81, 70, 137, 0.7)') {
      return setProfileIconColor(darkModePalette.pink100);
    }

    return setProfileIconColor('rgba(81, 70, 137, 0.7)');
  };

  const logOut = () => {
    navigate(ROUTES.login);
    return Cookies.remove(EMAIL);
  };

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
              marginLeft: '2.2rem',
              fontSize: theme.fontSizes.xs,
              fontWeight: theme.fontWeights.bold,
            }}
          >
            {name}
          </p>
        </Flex>
      </Flex>
      <Flex padding='0.5rem 1rem'>
        <div style={{ marginRight: '2rem' }}>
          <Icons name='notifiche' size={1.75} color='rgba(81, 70, 137, 0.7)' />
        </div>
        <div onClick={handleClick}>
          <Icons name='profilo' size={1.75} color={profileIconColor} />
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
