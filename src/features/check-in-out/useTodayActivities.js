import { useQuery } from '@tanstack/react-query';

import { getStaysTodayActivity } from '../../services/apiBookings';

function useTodayActivities() {
	const { data: activities, isLoading } = useQuery({
		queryFn: getStaysTodayActivity,
		queryKey: ['today-activities'],
	});
	return { activities, isLoading };
}

export default useTodayActivities;
