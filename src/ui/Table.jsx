import { createContext, useContext } from 'react';
import styled from 'styled-components';

const StyledTable = styled.table`
	border: 1px solid var(--color-grey-200);

	font-size: 1.4rem;
	background-color: var(--color-grey-0);
	border-radius: 7px;
	overflow: hidden;
`;

const CommonRow = styled.tr`
	display: grid;
	grid-template-columns: ${(props) => props.columns};
	column-gap: 2.4rem;
	align-items: center;
	transition: none;
	text-align: left;
`;

const StyledHeader = styled(CommonRow)`
	padding: 1.6rem 2.4rem;

	background-color: var(--color-grey-50);
	border-bottom: 1px solid var(--color-grey-100);
	text-transform: uppercase;
	letter-spacing: 0.4px;
	font-weight: 600;
	color: var(--color-grey-600);
`;

const StyledRow = styled(CommonRow)`
	padding: 1.2rem 2.4rem;

	&:not(:last-child) {
		border-bottom: 1px solid var(--color-grey-100);
	}
`;

const StyledBody = styled.tbody`
	margin: 0.4rem 0;
`;

const StyledFooter = styled.tfoot`
	background-color: var(--color-grey-50);
	display: flex;
	justify-content: center;
	padding: 1.2rem;

	/* This will hide the footer when it contains no child elements. Possible thanks to the parent selector :has 🎉 */
	&:not(:has(*)) {
		display: none;
	}
`;

const Empty = styled.td`
	font-size: 1.6rem;
	font-weight: 500;
	text-align: center;
	margin: 2.4rem;
`;

const TableContext = createContext();
function Table({ columns, children }) {
	return (
		<TableContext.Provider value={{ columns }}>
			<StyledTable>{children}</StyledTable>
		</TableContext.Provider>
	);
}

function Row({ children }) {
	const { columns } = useContext(TableContext);
	return (
		<StyledRow columns={columns}>
			{children.map((child, i) => (
				<td key={i}>{child}</td>
			))}
		</StyledRow>
	);
}

function Head({ children }) {
	const { columns } = useContext(TableContext);
	return (
		<thead>
			<StyledHeader columns={columns}>
				{children.map((child, i) => (
					<th key={i}>{child}</th>
				))}
			</StyledHeader>
		</thead>
	);
}

function Body({ data, render }) {
	if (!data.length) return <Empty>No data to show at the moment!</Empty>;
	return <StyledBody>{data.map(render)}</StyledBody>;
}

function Footer({ children }) {
	return (
		<StyledFooter>
			<tr style={{ width: '100%' }}>
				{Array.isArray(children) ? (
					children.map((child, i) => (
						<td key={i} style={{ display: 'block' }}>
							{child}
						</td>
					))
				) : (
					<td style={{ display: 'block' }}>{children}</td>
				)}
			</tr>
		</StyledFooter>
	);
}

Table.Head = Head;
Table.Body = Body;
Table.Foot = Footer;
Table.Row = Row;
Table.Empty = Empty;

export default Table;
