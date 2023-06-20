import { Flex, Text } from '@chakra-ui/react'
import { Icons } from '../../atoms'
import { icons } from '../../atoms/Icons'

interface Props {
    name?: string
    nameIcon?: icons
    colorIcon?: string
    paddingIcon?: string
    marginLeft?: string
    marginRight?: string
    paddingRight?: string
    nameOtherIcon?: icons
    dropDownOpen?: boolean
    show?: boolean;
}
const TextElement = ({
    name,
    nameIcon = undefined,
    nameOtherIcon = undefined,
    colorIcon = 'black',
    paddingIcon = '0rem 1.3rem',
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
                width: '100%',
            }}
        >
            {nameIcon && <Icons name={nameIcon} size={1.5} color={colorIcon} />}
            <Text
                style={{
                    fontWeight: '500',
                    lineHeight: '1.3rem',
                    fontSize: '14.2px',
                    padding: `${paddingIcon}`,
                }}
            >
                <span>{name}</span>
            </Text>
            {show
                ?
                null
                :
                nameOtherIcon && (
                    <span style={{ paddingTop: '12px', marginLeft: 'auto' }}>
                        {dropDownOpen ? (
                            <Icons
                                name={'dropdownIconGiu'}
                                size={1}
                                color={colorIcon}
                            />
                        ) : (
                            <Icons
                                name={'dropdownIconSu'}
                                size={1}
                                color={colorIcon}
                            />
                        )}
                    </span>
                )
            }
        </Flex>
    )
}
export default TextElement