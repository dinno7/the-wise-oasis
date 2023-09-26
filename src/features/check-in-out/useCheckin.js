import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateBooking } from '../../services/apiBookings';

export default function useCheckin() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const {
		mutate: makeCheckin,
		isLoading,
		error,
	} = useMutation({
		mutationFn: ({ id, breakfast }) =>
			updateBooking(id, {
				status: 'checked-in',
				isPaid: true,
				...breakfast,
			}),

		onSuccess: (data) => {
			toast.success(`The booking with id #${data.id} has been checked in successfully`);
			queryClient.invalidateQueries({ refetchPage: true });
			navigate('/dashboard');
		},

		onError: (err) => {
			toast.error(err.message);
			console.error(err.message);
		},
	});

	return { makeCheckin, isLoading, error };
}
