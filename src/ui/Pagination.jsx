import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import { PAGINATION_PER_PAGE_SIZE } from '../utils/constants';

const StyledPagination = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const P = styled.p`
	font-size: 1.4rem;
	margin-left: 0.8rem;

	& span {
		font-weight: bold;
	}
`;

const Buttons = styled.div`
	display: flex;
	gap: 0.6rem;
`;

const PaginationButton = styled.button`
	background-color: ${(props) => (props.active ? ' var(--color-brand-600)' : 'var(--color-grey-50)')};
	color: ${(props) => (props.active ? ' var(--color-brand-50)' : 'inherit')};
	border: none;
	border-radius: var(--border-radius-sm);
	font-weight: 500;
	font-size: 1.4rem;

	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.4rem;
	padding: 0.6rem 1.2rem;
	transition: all 0.3s;

	&:has(span:last-child) {
		padding-left: 0.4rem;
	}

	&:has(span:first-child) {
		padding-right: 0.4rem;
	}

	& svg {
		height: 1.8rem;
		width: 1.8rem;
	}

	&:hover:not(:disabled) {
		background-color: var(--color-brand-600);
		color: var(--color-brand-50);
	}

	&:disabled {
		color: var(--color-grey-400);
	}
`;

function Pagination({ count, pageSize = PAGINATION_PER_PAGE_SIZE }) {
	const [searchParams, setSearchParams] = useSearchParams();
	const currentPage = +searchParams.get('page') || 1;

	const pageCount = Math.ceil(count / pageSize);

	if (pageCount <= 1) return null;

	function prevPage() {
		if (currentPage > pageCount) {
			searchParams.set('page', pageCount);
			setSearchParams(searchParams);
			return;
		}

		const prev = currentPage == 1 ? currentPage : currentPage - 1;

		searchParams.set('page', prev);
		setSearchParams(searchParams);
	}

	function nextPage() {
		const next = currentPage == pageCount ? currentPage : currentPage + 1;

		searchParams.set('page', next);
		setSearchParams(searchParams);
	}

	return (
		<StyledPagination>
			<P>
				Shown
				<span> {currentPage > pageCount ? 1 : (currentPage - 1) * pageSize + 1} </span>
				to
				<span> {currentPage * pageSize >= count ? count : currentPage * pageSize} </span>
				of
				<span> {count} </span>
				result
			</P>

			<Buttons>
				<PaginationButton onClick={prevPage} disabled={currentPage == 1}>
					<HiChevronLeft />
					<span>Previous</span>
				</PaginationButton>
				<PaginationButton onClick={nextPage} disabled={currentPage >= pageCount}>
					<span>Next</span>
					<HiChevronRight />
				</PaginationButton>
			</Buttons>
		</StyledPagination>
	);
}

export default Pagination;
