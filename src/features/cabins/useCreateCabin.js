import toast from 'react-hot-toast';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createAndUpdateCabin } from '../../services/apiCabins';

export default function useCreateCabin() {
	const queryClient = useQueryClient();

	const { isLoading: isCreating, mutate: createCabin } = useMutation({
		mutationFn: createAndUpdateCabin,
		onSuccess: () => {
			queryClient.invalidateQueries(['cabins']);
			toast.success('Cabin created successfully');
		},
		onError: (err) => toast.error(err.message),
	});

	return { isCreating, createCabin };
}
