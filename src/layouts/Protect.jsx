import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import useUser from '../features/authentication/useUser';
import Spinner from '../ui/Spinner';

const FullScreen = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: var(--color-grey-50);
`;

function Protect({ children }) {
	const navigate = useNavigate();
	const { isLoading, isAuth } = useUser();

	useEffect(
		function () {
			if (!isAuth && !isLoading) return navigate('/login', { replace: true });
		},
		[isAuth, isLoading, navigate],
	);

	if (isLoading)
		return (
			<FullScreen>
				<Spinner />
			</FullScreen>
		);

	if (isAuth) return children;
	return null;
}

export default Protect;
