import { subDays } from 'date-fns';
import { useSearchParams } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';

import { getStaysAfterDate } from '../../services/apiBookings';

function useResentStays() {
	const [searchParams] = useSearchParams();

	const numDays = +searchParams.get('last') || 7;
	const queryDays = subDays(new Date(), numDays).toISOString();

	const {
		data: stays,
		isLoading,
		error,
	} = useQuery({
		queryFn: () => getStaysAfterDate(queryDays),
		queryKey: ['stays', `last-${numDays}`],
	});

	const confirmedStays = stays?.filter((s) => s.status === 'checked-in' || s.status === 'checked-out');

	return { stays, confirmedStays, numDays, isLoading, error };
}

export default useResentStays;
