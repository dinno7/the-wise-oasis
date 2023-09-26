import { createContext, useContext, useEffect } from 'react';

import useLocalStorageState from '../hooks/useLocalStorageState.js';

const Context = createContext();
function DarkModeContext({ children }) {
	const defaultValue = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

	const [theme, setTheme] = useLocalStorageState(defaultValue, 'theme');

	useEffect(() => {
		document.documentElement.dataset.theme = theme;
	}, [theme]);

	function toggleTheme() {
		setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
	}

	return <Context.Provider value={{ theme, isDark: theme === 'dark', toggleTheme }}>{children}</Context.Provider>;
}

export function useDarkMode() {
	const darkMode = useContext(Context);
	if (!darkMode) throw new Error('Use useDarkMode inside it provider');

	return darkMode;
}

export default DarkModeContext;
