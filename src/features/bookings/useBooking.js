import { useQuery } from '@tanstack/react-query';

import { getBooking } from '../../services/apiBookings';

export default function useBooking(id) {
	const { data, isLoading, error } = useQuery({
		queryFn: () => getBooking(id),
		queryKey: ['booking', id],
		retry: false,
	});

	return { data, isLoading, error };
}
