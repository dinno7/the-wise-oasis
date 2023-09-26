import { subDays } from 'date-fns';
import { useSearchParams } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';

import { getBookingsAfterDate } from '../../services/apiBookings';

function useResentBookings() {
	const [searchParams] = useSearchParams();

	const numDays = +searchParams.get('last') || 7;
	const queryDays = subDays(new Date(), numDays).toISOString();

	const {
		data: bookings,
		isLoading,
		error,
	} = useQuery({
		queryFn: () => getBookingsAfterDate(queryDays),
		queryKey: ['bookings', `last-${numDays}`],
	});
	return { bookings, isLoading, error };
}

export default useResentBookings;
