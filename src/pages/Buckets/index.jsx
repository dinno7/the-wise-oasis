import { HiOutlineHomeModern } from 'react-icons/hi2';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import WrapperGrid from '../../ui/WrapperGrid';

const BucketCard = styled(NavLink)`
	width: 18rem;
	font-weight: bold;
	font-size: 20px;
	color: var(--color-brand-500);
	background-color: var(--color-grey-100);
	border: 1px solid var(--color-brand-600);
	padding: 2rem 3rem;
	border-radius: 10px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	transition: all 0.3s ease;
	cursor: pointer;

	&:hover {
		background-color: var(--color-brand-50);
		color: var(--color-brand-700);
	}
`;

const buckets = [
	{
		name: 'Cabin',
		icon: <HiOutlineHomeModern size={26} fontWeight="bold" />,
	},
];

function index() {
	return (
		<WrapperGrid justify="start">
			{buckets.map((b) => (
				<BucketCard to="cabin" key={b.name}>
					<span>{b.name}</span>
					{b.icon}
				</BucketCard>
			))}
		</WrapperGrid>
	);
}

export default index;
