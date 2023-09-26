import { styled } from 'styled-components';

import Uploader from '../data/Uploader';
import Logo from './Logo';
import MainNav from './MainNav';

const StyledSidebar = styled.aside`
	background-color: var(--color-grey-0);
	border-right: 1px solid var(--color-grey-100);
	padding: 4rem;
	grid-row: 1 / -1;

	display: flex;
	flex-direction: column;
	gap: 3.5rem;
`;
function SideBar() {
	return (
		<StyledSidebar>
			<Logo />
			<MainNav />

			{import.meta.env.DEV && <Uploader />}
		</StyledSidebar>
	);
}

export default SideBar;
