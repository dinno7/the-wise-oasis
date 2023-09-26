import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import supabase from '../services/supabase';

export default function useStorageImages(bucketName) {
	const [imageUrls, setImageUrls] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		async function getImages() {
			try {
				setIsLoading(true);
				const { data: allImages, error } = await supabase.storage.from(bucketName).list('', {
					limit: 100,
					offset: 0,
					sortBy: { column: 'name', order: 'asc' },
				});
				if (error) throw new Error(error.message);

				setImageUrls(
					allImages.map((img) => supabase.storage.from(bucketName).getPublicUrl(img.name)).map((i) => i.data.publicUrl),
				);
			} catch (error) {
				setImageUrls([]);
			} finally {
				setIsLoading(false);
			}
		}

		if (bucketName) getImages();
	}, [bucketName]);

	async function deleteImage(imgName) {
		const { data, error } = await supabase.storage.from(bucketName).remove([imgName]);
		if (error) {
			toast.error(error.message);
			console.error('⭕️ ~ ERROR  ~ in the-wild-oasis: src/hooks/useStorageImages.js ~> ❗', error.message);
			return null;
		}

		toast.success('Deleted successfully');

		return data;
	}

	return { imageUrls, isLoading, deleteImage };
}
