import { Button, Flex } from '@chakra-ui/react'
import TextElement from '../../molecules/TextElement'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { icons } from '../../atoms/Icons'
import MenuList from '../../molecules/MenuList'
import { SIDEBAR } from '../../../utils'

interface Props
{
    nameIcon?: string
    nameOtherIcon?: icons; 
    name?: string;
    marginRight?: string
    onclick?: () => void
    dropdownVerification?: boolean
    subLinks?: any[]
    show?: boolean;
}
const SidebarLink = ({nameIcon = '', name = '', marginRight = '', nameOtherIcon, show = false, dropdownVerification = false }: Props) =>
{
    const navigate = useNavigate();
    const [open, setOpen] = useState<boolean>(false);
    const [icon, setIcon] = useState<icons | undefined>();
    const [arrow, setArrow] = useState<icons | undefined>();

    const handleClick = () =>
    {
        if (!dropdownVerification)
        {
            SIDEBAR.map((link) =>
            {
                // if(link.dropdownVerification)
                // {
                //     link.path?.map((linkPath) =>
                //     {
                //         if(linkPath.name === name)
                //         {
                //             linkPath.href && navigate(linkPath.href);
                //         }
                //     })
                // }
                // else
                // {
                    if(link.name === name)
                    {
                        link.href && navigate(link.href);
                    }
                // }
            })
        }
        else
        {
            setOpen(!open);
        }
    }

    useEffect(() =>
    {
        let iconCode:icons;
        let arrowCode:icons;

        if(nameIcon === 'home')
        {
            iconCode = nameIcon;
            setIcon(iconCode)
        }

        if(nameIcon === 'inserimentoVeloce')
        {
            iconCode = nameIcon;
            setIcon(iconCode)
        }

        if(nameIcon === 'acquisti')
        {
            iconCode = nameIcon;
            setIcon(iconCode)
        }

        if(nameIcon === 'anagrafiche')
        {
            iconCode = nameIcon;
            setIcon(iconCode)
        }

        if(nameIcon === 'settings')
        {
            iconCode = nameIcon;
            setIcon(iconCode)
        }

        if(nameIcon === 'timesheet')
        {
            iconCode = nameIcon;
            setIcon(iconCode)
        }

        if(nameOtherIcon === 'dropdownIconGiu')
        {
            arrowCode = nameOtherIcon;
            setArrow(arrowCode);
        }

        if(nameOtherIcon === 'dropdownIconSu')
        {
            arrowCode = nameOtherIcon;
            setArrow(arrowCode);
        }

    },[])

    return (
        <Flex width='100%' height='100%' direction='column'>
            <Button className='listLink'
                padding={0}
                colorScheme="gray"
                variant="ghost"
                border={0}
                width={'100%'}
                onClick={show && open ? ()=>{return} : handleClick}
                type="button"
            >
            <TextElement
                name={name}
                nameIcon={icon}
                marginRight={marginRight}
                nameOtherIcon={arrow}
                dropDownOpen={!open}
                show={show}
            />
            </Button>
            <Flex>
                {open && <MenuList name={name}/>}
            </Flex>
        </Flex>
    )
}
export default SidebarLink