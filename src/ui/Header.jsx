import { HiOutlineUser } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

import UserAvatar from '../features/authentication/UserAvatar';
import ButtonIcon from './ButtonIcon';
import DarkModeToggle from './DarkModeToggle';
import Logout from './Logout';

const StyledHeader = styled.header`
	background-color: var(--color-grey-0);
	padding: 1rem;
	border-bottom: 1px solid var(--color-grey-100);
`;

const HeaderWrapper = styled.ul`
	display: flex;
	justify-content: flex-end;
	align-items: center;
`;

function Header() {
	const navigate = useNavigate();
	return (
		<StyledHeader>
			<HeaderWrapper>
				<li style={{ marginRight: 'auto' }}>
					<UserAvatar />
				</li>
				<li>
					<DarkModeToggle />
				</li>
				<li>
					<ButtonIcon onClick={() => navigate('/account')}>
						<HiOutlineUser />
					</ButtonIcon>
				</li>
				<li>
					<Logout />
				</li>
			</HeaderWrapper>
		</StyledHeader>
	);
}

export default Header;
