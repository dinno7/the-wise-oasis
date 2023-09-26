import styled, { css } from 'styled-components';

const sizes = {
	small: css`
		font-size: 1.2rem;
		padding: 0.4rem 0.8rem;
		text-transform: uppercase;
		font-weight: 600;
		text-align: center;
	`,
	medium: css`
		font-size: 1.4rem;
		padding: 1.2rem 1.6rem;
		font-weight: 500;
	`,
	large: css`
		font-size: 1.6rem;
		padding: 1.2rem 2.4rem;
		font-weight: 500;
	`,
};

const variations = {
	primary: css`
		color: var(--color-brand-50);
		background-color: var(--color-brand-600);
		border: 1px solid var(--color-brand-500);

		&:hover {
			background-color: var(--color-brand-700);
		}
		&:disabled {
			background-color: var(--color-brand-400);
		}
	`,
	secondary: css`
		color: var(--color-grey-600);
		background-color: var(--color-grey-0);
		border: 1px solid var(--color-grey-400);

		&:hover {
			background-color: var(--color-grey-100);
		}
		&:disabled {
			background-color: var(--color-grey-50);
		}
	`,
	danger: css`
		color: var(--color-red-100);
		background-color: var(--color-red-600);
		border: 1px solid var(--color-red-600);

		&:hover {
			background-color: var(--color-red-500);
		}
		&:disabled {
			background-color: var(--color-red-300);
			border-color: var(--color-red-300);
		}
	`,
};

const Button = styled.button`
	border: 1px solid var(--color-grey-300);
	${(props) => sizes[props.size]}
	${(props) => variations[props.variation]}
	border-radius: var(--border-radius-sm);
	box-shadow: var(--shadow-sm);
	&:focus {
		outline: none;
	}
`;

Button.defaultProps = {
	size: 'medium',
	variation: 'primary',
};

export default Button;
