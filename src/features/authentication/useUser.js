import { useQuery } from '@tanstack/react-query';

import { getCurrentUser } from '../../services/apiAuth';

function useUser() {
	const {
		data: user,
		error,
		isLoading,
	} = useQuery({
		queryFn: getCurrentUser,
		queryKey: ['user'],
	});

	return {
		user,
		isAuth: user?.role === 'authenticated',
		isLoading,
		error,
	};
}

export default useUser;
