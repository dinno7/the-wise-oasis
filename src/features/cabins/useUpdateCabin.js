import toast from 'react-hot-toast';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createAndUpdateCabin } from '../../services/apiCabins';

export default function useUpdateCabin() {
	const queryClient = useQueryClient();
	const { isLoading: isUpdating, mutate: updateCabin } = useMutation({
		mutationFn: ({ newCabinData, cabinId }) => createAndUpdateCabin(newCabinData, cabinId),
		onSuccess: () => {
			queryClient.invalidateQueries(['cabins']);
			toast.success('Cabin edited successfully');
		},
		onError: (err) => toast.error(err.message),
	});

	return { isUpdating, updateCabin };
}
