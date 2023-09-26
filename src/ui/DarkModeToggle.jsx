import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2';

import { useDarkMode } from '../contexts/DarkModeContext';
import ButtonIcon from './ButtonIcon';

function DarkModeToggle() {
	const { isDark, toggleTheme } = useDarkMode();
	return <ButtonIcon onClick={toggleTheme}>{isDark ? <HiOutlineSun /> : <HiOutlineMoon />}</ButtonIcon>;
}

export default DarkModeToggle;
