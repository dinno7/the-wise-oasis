import toast from 'react-hot-toast';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateUser as updateUserService } from '../../services/apiAuth';

export default function useUpdateUser() {
	const queryClient = useQueryClient();
	const { isLoading: isUpdating, mutate: updateUser } = useMutation({
		mutationFn: updateUserService,
		onSuccess: () => {
			queryClient.invalidateQueries(['user']);
			toast.success('User updated successfully');
		},
		onError: (err) => toast.error(err.message),
	});

	return { isUpdating, updateUser };
}
