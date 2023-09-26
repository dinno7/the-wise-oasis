import supabase, { supabaseUrl } from '../services/supabase';
import { checkIsDemo } from '../utils/helpers';

export async function getCabins() {
	let { data: cabins, error } = await supabase.from('cabins').select('*').order('created_at', { ascending: false });

	if (error) {
		console.error('⭕️ ~ ERROR  ~ in the-wild-oasis: src/services/apiCabins.js ~> ❗', error.message);
		throw new Error(error.message || 'There is some problem in Get all cabins');
	}

	return cabins;
}

export async function deleteCabinById(id) {
	checkIsDemo();

	const { error, data } = await supabase.from('cabins').delete().eq('id', id);

	if (error) {
		console.error('⭕️ ~ ERROR  ~ in the-wild-oasis: src/services/apiCabins.js ~> ❗', error.message);
		throw new Error(error.message || 'There is some problem in Get all cabins');
	}

	return data;
}

export async function createAndUpdateCabin(newCabin, id) {
	checkIsDemo();

	const { imageName, imageUrl, hasUploadedImg } = generateImgUrlAndName(newCabin.image);

	let query = supabase.from('cabins');

	// It means create
	if (!id)
		query = query
			.insert([{ ...newCabin, image: imageUrl }])
			.select()
			.single();
	// It means update
	else query = query.update({ ...newCabin, image: imageUrl }).eq('id', id);

	const { error, data: cabin } = await query;

	if (error) {
		console.error('⭕️ ~ ERROR  ~ in the-wild-oasis: src/services/apiCabins.js ~> ❗', error.message);
		throw new Error(error.message || 'There is some problem in Get all cabins');
	}

	if (!hasUploadedImg) {
		const { error: storageError } = await supabase.storage.from('cabin-images').upload(imageName, newCabin.image);

		if (storageError) {
			await supabase.from('cabins').delete().eq('id', cabin.id);
			console.error('⭕️ ~ ERROR  ~ in the-wild-oasis: src/services/apiCabins.js ~> ❗', error.message);
			throw new Error('The image is not valid so cabin do not created');
		}
	}

	return cabin;
}

function generateImgUrlAndName(image) {
	// https://liljtixfylnvgdfpkmtx.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

	const hasUploadedImg = image?.startsWith?.(supabaseUrl);
	let imageName = null,
		imageUrl = null;

	if (hasUploadedImg) {
		imageName = image.split('/').at(-1);
		imageUrl = image;
	} else {
		imageName = `${Math.random().toString(32).substring(2)}-${image.name}`.replaceAll('/', '');
		imageUrl = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
	}

	return { imageName, imageUrl, hasUploadedImg };
}
