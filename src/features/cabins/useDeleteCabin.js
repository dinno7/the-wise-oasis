import toast from 'react-hot-toast';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteCabinById } from '../../services/apiCabins';

export default function useDeleteCabin() {
	const queryClient = useQueryClient();

	const { mutate: deleteCabin, isLoading: isDeleting } = useMutation({
		mutationFn: deleteCabinById,
		onSuccess: () => {
			queryClient.invalidateQueries(['cabins']);
			toast.success('Cabin deleted successfully');
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	return {
		deleteCabin,
		isDeleting,
	};
}
