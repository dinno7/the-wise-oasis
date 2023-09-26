import toast from 'react-hot-toast';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteBooking as deleteBookingService } from '../../services/apiBookings';

export default function useDeleteBooking() {
	const queryClient = useQueryClient();
	const {
		mutate: deleteBooking,
		isLoading,
		error,
	} = useMutation({
		mutationFn: (id) => deleteBookingService(id),

		onSuccess: () => {
			toast.success(`Booking has been deleted successfully`);
			queryClient.invalidateQueries(['bookings']);
		},

		onError: (err) => {
			toast.error(err.message || 'There is some problem in deleting booking');
		},
	});

	return {
		deleteBooking,
		isLoading,
		error,
	};
}
