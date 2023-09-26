import { Outlet } from 'react-router-dom';
import { styled } from 'styled-components';

import Header from '../ui/Header';
import SideBar from '../ui/SideBar';

const LayoutWrapper = styled.div`
	display: grid;
	grid-template-columns: 30rem 1fr;
	grid-template-rows: auto 1fr;
	height: clamp(100vh, 100vh, 100vh);
`;

const Main = styled.main`
	background-color: var(--color-grey-50);
	padding: 4rem 4.6rem 5rem;
	overflow: auto;
`;

const Container = styled.div`
	max-width: 120rem;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	gap: 3.5rem;
`;

function DefaultLayout() {
	return (
		<LayoutWrapper>
			<SideBar />
			<Header />
			<Main>
				<Container>
					<Outlet />
				</Container>
			</Main>
		</LayoutWrapper>
	);
}

export default DefaultLayout;
