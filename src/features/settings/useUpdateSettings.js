import toast from 'react-hot-toast';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateSetting } from '../../services/apiSettings';

export default function useUpdateSettings() {
	const queryClient = useQueryClient();
	const { isLoading: isUpdating, mutate: updateSettings } = useMutation({
		mutationFn: updateSetting,
		onSuccess: () => {
			queryClient.invalidateQueries(['settings']);
			toast.success('Settings edited successfully');
		},
		onError: (err) => toast.error(err.message),
	});

	return { isUpdating, updateSettings };
}
