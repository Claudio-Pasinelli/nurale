import { Flex } from '@chakra-ui/react'
import SidebarLink from '../SidebarLink'
import { Icons, Spacer } from '../../atoms'
import { useState } from 'react'
import { ROUTES, SIDEBAR } from '../../../utils'
import { useNavigate } from 'react-router-dom'

const Sidebar = () =>
{
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleOpen = () =>
    {
        setOpen(!open)
    }
    return (
        <Flex direction='column' height='100vh' width={open ? '5rem' : '16rem'}
            style={{
                boxShadow: '0 1px 8px rgba(81, 70, 137, 0.5)',
                borderRadius: '0 0 20px 0',
                zIndex: '10',
                padding: '22px',
            }}>
            <Flex border='solid #514689' borderWidth='0 0 2px 0' direction='column' padding='0 0 1.5rem'>
                {open ? <img src='./images/logo-piccolo.svg'/> : <img src='./images/login-titolo.svg'/>} 
            </Flex>
            <div style={{position: 'absolute', left: open ? '4.25rem' : '15rem', top: '5.25rem', cursor:'pointer'}} onClick={handleOpen}>
                <Icons name={open ? 'triangoloDx' : 'triangoloSn'} size={1.5} maxHeight={1.5}/> 
            </div>
            <Spacer width={'20px'} height={'25px'} />
            <Flex direction='column' overflow='hidden auto' alignSelf='center'>
                {SIDEBAR.map((link) =>
                (
                    <SidebarLink
                        name={open ? '' : link.name}
                        nameIcon={link.icon}
                        dropdownVerification={link.dropdownVerification}
                        nameOtherIcon={open ? undefined : link.nameOtherIcon}
                        show={open}
                        key={link.name+link.icon}
                    />
                ))}
            </Flex>
            <Flex direction='column' border='solid #514689' borderWidth='2px 0 0 0'>
                <Spacer width={'20px'} height={'25px'} />
                <Flex onClick={()=> navigate(ROUTES.login)} cursor='pointer'>
                    <Icons name='logout' size={1.5}/>{open ? null: <span style={{padding:'0 1.3rem'}}>Logout</span>}
                </Flex>
                <Spacer width={'20px'} height={'25px'} />
                <Flex cursor='pointer'>
                    <Icons name='darkMode' size={1.5}/>{open ? null: <span style={{padding:'0 1.3rem'}}>Dark Mode</span>}
                </Flex>
            </Flex>
        </Flex>
    )
}
export default Sidebar