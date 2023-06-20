import { SIDEBAR } from '../../../utils'
import TextSidebar from '../../organisms/SidebarLink'

interface Props
{
    name: string
}

const MenuList = ({name }: Props) => {
    return (<ul>
                {SIDEBAR.map((sidebar) => 
                    sidebar.name === name ? (
                        sidebar.path?.map((subLink) =>
                            (
                                <li key={name}>
                                    <TextSidebar name={subLink.name} />
                                </li>
                            )
                        )
                    ):null
                )
            }
            </ul>
    )
}
export default MenuList