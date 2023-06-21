import { Flex, Stack, Switch } from '@chakra-ui/react'
import SidebarLink from '../SidebarLink'
import { Icons, Spacer } from '../../atoms'
import { useState } from 'react'
import { ROUTES, SIDEBAR } from '../../../utils'
import { useNavigate } from 'react-router-dom'
import './index.css';

const Sidebar = () =>
{
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleOpen = () =>
    {
        setOpen(!open)
    }
    
    const handleOpenOnLinkClick = () =>
    {
        setOpen(false);
    }

    console.log(open)

    return (
        <Flex direction='column' height='100vh' width={open ? '3rem' : '16rem'}
            style={{
                boxShadow: '0 1px 8px rgba(81, 70, 137, 0.5)',
                borderRadius: '0 0 20px 0',
                zIndex: '10',
                padding: open ? '22px 5px 5px 5px' : '22px',
            }}>
            <Flex border='solid #514689' borderWidth='0 0 2px 0' direction='column' padding='0 0 1.5rem'>
                {open ? <img src='./images/logo-piccolo.svg'/> : <img src='./images/login-titolo.svg'/>} 
            </Flex>
            <div style={{position: 'absolute', left: open ? '2.25rem' : '15rem', top: '5.25rem', cursor:'pointer'}} onClick={handleOpen}>
                <Icons name={open ? 'triangoloDx' : 'triangoloSn'} size={1.5} maxHeight={1.5}/> 
            </div>
            <Spacer width={'20px'} height={'25px'} />
            <Flex direction='column' overflow='hidden auto' alignSelf='center' marginTop='auto' margin={open ? 'auto' : 'auto 0 0 0'}>
                {SIDEBAR.map((link) =>
                (
                    <div key={link.name+link.icon+link.href} onClick={handleOpenOnLinkClick}>
                        <SidebarLink
                            name={open ? '' : link.name}
                            nameIcon={link.icon}
                            dropdownVerification={link.dropdownVerification}
                            nameOtherIcon={open ? undefined : link.nameOtherIcon}
                            show={open}
                        />
                    </div>
                ))}
            </Flex>
            <Flex direction='column' border='solid #514689' borderWidth='2px 0 0 0' marginTop='auto'>
                <Spacer width={'20px'} height={'25px'} />
                <Flex onClick={()=> navigate(ROUTES.login)} cursor='pointer'>
                    <Icons name='logout' size={1.5}/>{open ? null: <span style={{padding:'0 1.3rem'}}>Logout</span>}
                </Flex>
                <Spacer width={'20px'} height={'25px'} />
                <Flex cursor='pointer'>
                    <Icons name='darkMode' size={1.5}/>
                    {open
                            ?
                        null
                            :
                        <Flex>
                            <span style={{padding:'0 1.3rem'}}>Dark Mode</span>
                            <Stack align='center' direction='row'>
                                <Switch size='md' />
                            </Stack>
                        </Flex>
                    }
                </Flex>
            </Flex>
        </Flex>
    )
}
export default Sidebar