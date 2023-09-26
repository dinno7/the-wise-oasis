import toast from 'react-hot-toast';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateBooking } from '../../services/apiBookings';

export default function useCheckout() {
	const queryClient = useQueryClient();

	const {
		mutate: makeCheckout,
		isLoading,
		error,
	} = useMutation({
		mutationFn: (id) =>
			updateBooking(id, {
				status: 'checked-out',
			}),

		onSuccess: (data) => {
			toast.success(`The booking with id #${data.id} has been checked out successfully`);
			queryClient.invalidateQueries({ refetchPage: true });
		},

		onError: (err) => {
			toast.error(err.message);
			console.error(err.message);
		},
	});

	return { makeCheckout, isLoading, error };
}
