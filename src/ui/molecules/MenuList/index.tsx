import { useNavigate } from 'react-router-dom';
import { SIDEBAR } from '../../../utils'
import Li from '../../atoms/Li';
import TextElement from '../TextElement';
interface Props
{
    name: string
}

const MenuList = ({name }: Props) =>
{
    const navigate = useNavigate();

    return (<ul style={{paddingLeft: '30px'}}>
                {SIDEBAR.map((sidebar) => 
                    sidebar.name === name ? (
                        sidebar.path?.map((subLink) =>
                            (
                                <Li style={{paddingBlock: '10px'}}
                                    onClick={() => navigate(subLink.href)}
                                    current={
                                        location.pathname === subLink.href ? true : false
                                    }
                                    key={subLink.href}>
                                    <TextElement name={subLink.name}/>
                                </Li>
                            )
                        )
                    ):null
                )
            }
            </ul>
    )
}
export default MenuList;