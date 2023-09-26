import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
     to {
    background-position: -100% 0;
  }
`;

const Skeleton = styled.div`
	width: 28rem;
	height: 28rem;
	border-radius: 0.8rem;
	background-color: var(--color-grey-100);
	overflow: hidden;
	padding: 1.5rem;
	&::after {
		content: '';
		display: block;
		width: 100%;
		height: 100%;
		border-radius: inherit;
		background-image: linear-gradient(
			90deg,
			var(--color-grey-300) 0px,
			rgb(229 229 229 / 90%) 40px,
			var(--color-grey-300) 80px
		);
		background-size: 300%;
		background-position: 100% 0;
		animation: ${shimmer} 1.5s infinite ease;
	}
`;

export default Skeleton;
