import styled from 'styled-components';

const WrapperGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(${(props) => props.columns || 'auto-fit'}, minmax(250px, 1fr));
	grid-gap: 1.5rem;
	justify-items: center;
	gap: 2.5rem;
	justify-items: ${(props) => props.justify || 'center'};
`;

export default WrapperGrid;
