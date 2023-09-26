import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { login as loginService } from '../../services/apiAuth';

function useLogin() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const {
		mutate: login,
		isLoading: isLoggingIn,
		error,
	} = useMutation({
		mutationFn: ({ email, password }) => loginService(email, password),

		onSuccess: ({ user }) => {
			toast.success('Logged in successfully');
			queryClient.setQueryData(['user'], user);
			navigate('/dashboard', { replace: true });
		},

		onError: (err) => {
			toast.error(err.message);
			console.error('✨', err);
		},
	});

	return {
		login,
		isLoggingIn,
		error,
	};
}

export default useLogin;
