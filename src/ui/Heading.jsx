import styled, { css } from 'styled-components';

const Heading = styled.h1`
	${(props) =>
		props.as === 'h1' &&
		css`
			font-size: 24px;
			font-weight: 600;
		`};

	${(props) =>
		props.as === 'h2' &&
		css`
			font-size: 22px;
			font-weight: 500;
		`};

	${(props) =>
		props.as === 'h3' &&
		css`
			font-size: 20px;
			font-weight: 400;
		`};

	${(props) =>
		props.as === 'h4' &&
		css`
			font-size: 18px;
			font-weight: 300;
		`};

	color: var(--color-grey-900);
`;

export default Heading;