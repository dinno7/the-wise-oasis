import { useQuery } from '@tanstack/react-query';

import { getSettings } from '../../services/apiSettings';

export default function useSettings() {
	const { data, error, isLoading } = useQuery({
		queryKey: ['settings'],
		queryFn: getSettings,
	});

	return {
		settings: data,
		isLoading,
		error,
	};
}
