import { useNavigate, useLocation } from 'react-router-dom';
import { SIDEBAR } from '../../../utils/costants';

const Sidebar = () => {
  const navigate = useNavigate();
  const handleClick = (path: string) => {
    navigate(path);
  };
  const location = useLocation();

  return (
    <nav style={{display:'flex', flexDirection:'column', height:'100vh', width:'16rem', boxShadow: 'rgba(81, 70, 137, 0.2) 1px 0px 4px', borderRadius:'0 0 2rem 0'}}>
      <ul>
        {SIDEBAR.map((link) => (
          <li
            key={link.href}
            onClick={() => handleClick(link.href)}
            // className={
            //   location.pathname === link.href
            //     ? 'bg-indigo-700 text-white'
            //     : 'text-indigo-200 hover:text-white hover:bg-indigo-700'
            // }
            style={{
              cursor: 'pointer',
            }}
          >
            {link.name}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
