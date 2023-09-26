import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { logout as logoutService } from '../../services/apiAuth';

function useLogout() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const {
		mutate: logout,
		isLoading,
		error,
	} = useMutation({
		mutationFn: logoutService,

		onSuccess: () => {
			queryClient.removeQueries();
			toast.success('Logged out successfully');
			navigate('/login', { replace: true });
		},

		onError: (err) => {
			toast.error(err.message || 'There is some problem in logging out');
			console.error('⭕️ ~ ERROR  ~ ❗', err.message);
		},
	});
	return { logout, isLoading, error };
}

export default useLogout;
