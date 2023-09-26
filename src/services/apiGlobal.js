import { checkIsDemo } from '../utils/helpers';
import supabase from './supabase';

export async function getStorageImages(bucketName) {
	const { data: allImages, error } = await supabase.storage.from(bucketName).list('', {
		limit: 100,
		offset: 0,
		sortBy: { column: 'name', order: 'asc' },
	});

	if (error) {
		console.error('⭕️ ~ ERROR  ~ in the-wild-oasis: src/services/apiCabins.js ~> ❗', error.message);
		throw new Error(error.message || 'There is some problem in Get all cabin images');
	}

	const urls = allImages
		.map((img) => supabase.storage.from(bucketName).getPublicUrl(img.name))
		.map((i) => i.data.publicUrl);

	return urls;
}

export async function deleteStorageImage(bucketName, imgNames = []) {
	checkIsDemo();
	const { data, error } = await supabase.storage.from(bucketName).remove(imgNames);
	if (error) {
		console.error('⭕️ ~ ERROR  ~ in the-wild-oasis: src/hooks/useStorageImages.js ~> ❗', error.message);

		throw new Error(error.message);
	}

	return data;
}
