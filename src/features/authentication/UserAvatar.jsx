import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import useUser from './useUser.js';

const StyledUserAvatar = styled.div`
	display: flex;
	gap: 1.2rem;
	align-items: center;
	font-weight: 500;
	font-size: 1.4rem;
	color: var(--color-grey-600);
	cursor: pointer;
`;

const Avatar = styled.img`
	display: block;
	width: 4rem;
	width: 3.6rem;
	aspect-ratio: 1;
	object-fit: cover;
	object-position: center;
	border-radius: 50%;
	outline: 2px solid var(--color-grey-100);
`;

function UserAvatar() {
	const navigate = useNavigate();
	const { user } = useUser();
	const {
		user_metadata: { fullName = 'Your account', avatar },
	} = user;
	return (
		<StyledUserAvatar onClick={() => navigate('/account')}>
			<Avatar src={avatar || '/default-user.jpg'} />
			<span>{fullName}</span>
		</StyledUserAvatar>
	);
}

export default UserAvatar;
