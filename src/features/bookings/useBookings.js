import { useSearchParams } from 'react-router-dom';

import { useQuery, useQueryClient } from '@tanstack/react-query';

import { getBookings } from '../../services/apiBookings';
import { PAGINATION_PER_PAGE_SIZE } from '../../utils/constants';

export default function useBookings() {
	const queryClient = useQueryClient();
	const [searchParams] = useSearchParams();

	// FILTER
	const statusFilter = searchParams.get('status') || 'all';
	const possibleStatus = ['unconfirmed', 'checked-in', 'checked-out'];
	let filter = null;
	if (possibleStatus.includes(statusFilter)) {
		filter = { field: 'status', value: statusFilter, method: 'eq' };
	}

	// SORT
	const [field, direction] = searchParams.get('sortBy')?.split('-') || '';
	const sort = field ? { field, ascending: direction === 'asc' } : null;

	// PAGINATION
	const page = +searchParams.get('page') || 1;

	const {
		data: { data, count } = {},
		isLoading,
		error,
	} = useQuery({
		queryFn: () => getBookings({ filter, sort, page }),
		queryKey: ['bookings', filter, sort, page],
	});

	const pageCount = Math.ceil(count / PAGINATION_PER_PAGE_SIZE);

	if (page < pageCount)
		queryClient.prefetchQuery({
			queryFn: () => getBookings({ filter, sort, page: page + 1 }),
			queryKey: ['bookings', filter, sort, page + 1],
		});

	if (page > 1)
		queryClient.prefetchQuery({
			queryFn: () => getBookings({ filter, sort, page: page - 1 }),
			queryKey: ['bookings', filter, sort, page - 1],
		});

	return { data, count, isLoading, error };
}
