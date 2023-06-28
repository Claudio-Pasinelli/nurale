import home from './Home'
import notifiche from './Notifiche'
import profilo from './Profilo'
import inserimentoVeloce from './InserimentoVeloce'
import anagrafiche from './Anagrafiche'
import acquisti from './Acquisti'
import settings from './Settings'
import timesheet from './Timesheet'
import logout from './Logout'
import darkMode from './DarkMode'
import triangoloSn from './TriangoloSn'
import triangoloDx from './TriangoloDx'
import dropdownIconGiu from './DropdownIconGiu'
import dropdownIconSu from './DropdownIconSu'
import btnTriangoloSn from './BtnTriangoloSn'
import btnTriangoloDx from './BtnTriangoloDx'
import xCloseIcon from './XCloseIcon'

export type icons = 'home' | 'notifiche' | 'profilo' | 'inserimentoVeloce'  | 'anagrafiche' | 
'acquisti' | 'settings' | 'timesheet' | 'logout' | 'darkMode' | 'triangoloSn' | 'triangoloDx' | 'dropdownIconSu' | 'dropdownIconGiu' | 'btnTriangoloSn' |
'btnTriangoloDx' | 'xCloseIcon'

interface Props {
    name: icons;
    size?: number;
    maxHeight?: number;
    color?: string;
}

const Icons = ({name, size = 2.4 , maxHeight = 2.4, color = 'black'}: Props)=>{
    const index = {
        home,
        notifiche,
        profilo,
        inserimentoVeloce,
        anagrafiche,
        acquisti,
        settings,
        timesheet,
        logout,
        darkMode,
        triangoloSn,
        triangoloDx,
        dropdownIconSu,
        dropdownIconGiu,
        btnTriangoloDx,
        btnTriangoloSn,
        xCloseIcon,
    }
        const Icon = index[name];
        return <Icon color={color} maxHeight={maxHeight} size={size}/>
    
}

export default Icons