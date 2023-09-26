import toast from 'react-hot-toast';

import { useMutation } from '@tanstack/react-query';

import { signUp as signUpService } from '../../services/apiAuth';

function useSignUp() {
	const {
		mutate: signUp,
		isLoading,
		error,
	} = useMutation({
		mutationFn: signUpService,

		onSuccess: () => {
			toast.success('User added successfully');
		},

		onError: (err) => {
			toast.error(err.message);
		},
	});
	return { signUp, isLoading, error };
}

export default useSignUp;
