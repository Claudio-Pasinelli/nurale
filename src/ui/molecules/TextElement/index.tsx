import { Flex, Text } from '@chakra-ui/react';
import Icons, { icons } from 'ui/atoms/Icons';

interface Props {
  name?: string;
  nameIcon?: icons;
  colorIcon?: string;
  paddingIcon?: string;
  marginLeft?: string;
  marginRight?: string;
  paddingRight?: string;
  nameOtherIcon?: icons;
  dropDownOpen?: boolean;
  show?: boolean;
}
const TextElement = ({
  name,
  nameIcon = undefined,
  nameOtherIcon = undefined,
  colorIcon = 'black',
  paddingIcon = '0 0.8rem',
  marginLeft = '',
  marginRight = '',
  paddingRight = '',
  dropDownOpen = false,
  show = false,
}: Props) => {
  return (
    <Flex
      style={{
        display: 'flex',
        alignItems: 'center',
        marginLeft: `${marginLeft}`,
        marginRight: `${marginRight}`,
        paddingRight: `${paddingRight}`,
        width: show ? '' : '100%',
      }}
    >
      {nameIcon && <Icons name={nameIcon} size={1.5} color={colorIcon} />}
      {show ? null : (
        <Text
          style={{
            fontWeight: 'bold',
            lineHeight: '1.3rem',
            fontSize: '14.2px',
            padding: `${paddingIcon}`,
          }}
        >
          <span style={{ fontSize: '0.8rem' }}>{name}</span>
          {/* <span style={{fontWeight:'600', fontSize:theme.fontSizes.xxs, color: pathname === location.pathname ? '#ef426f' : 'black'}}>{name}</span> */}
        </Text>
      )}
      {show
        ? null
        : nameOtherIcon && (
            <span style={{ paddingRight: '5px', marginLeft: 'auto' }}>
              {dropDownOpen ? (
                <Icons name={'dropdownIconGiu'} size={0.8} color={colorIcon} />
              ) : (
                <Icons name={'dropdownIconSu'} size={0.8} color={colorIcon} />
              )}
            </span>
          )}
    </Flex>
  );
};
export default TextElement;
