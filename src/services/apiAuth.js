import { checkIsDemo } from '../utils/helpers';
import supabase, { supabaseUrl } from './supabase';

export async function signUp({ fullName, email, password }) {
	checkIsDemo();
	let { data, error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			data: {
				fullName,
				avatar: '',
			},
		},
	});
}

export async function login(email, password) {
	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	if (error) {
		console.error('⭕️ ~ ERROR  ~ ❗', error.message);
		throw new Error(error.message || 'There is some problem in Get all cabins');
	}

	return data;
}

export async function getCurrentUser() {
	const {
		data: { session },
		error: sessionError,
	} = await supabase.auth.getSession();
	if (sessionError) {
		console.error('⭕️ ~ ERROR  ~ ❗', sessionError.message);
		throw new Error(sessionError.message || 'There is some problem in Get all cabins');
	}
	if (!session) return null;

	const {
		data: { user },
		error: userError,
	} = await supabase.auth.getUser();

	if (userError) {
		console.error('⭕️ ~ ERROR  ~ ❗', userError.message);
		throw new Error(userError.message || 'There is some problem in Get all cabins');
	}

	return user;
}

export async function logout() {
	const { error } = await supabase.auth.signOut();

	if (error) {
		console.error('⭕️ ~ ERROR  ~ ❗', error.message);
		throw new Error(error.message || 'There is some problem in Get all cabins');
	}
}

export async function updateUser({ fullName, password, avatar }) {
	checkIsDemo();

	let updateFields = {};
	if (password) updateFields = { password };
	if (fullName) updateFields = { data: { fullName } };

	const { data: { user } = {}, error } = await supabase.auth.updateUser(updateFields);

	if (error) throw new Error(error.message);

	if (!avatar) return user;

	const { imageName, imageUrl } = generateImgUrlAndName(avatar, user);
	const { data, error: errorStorage } = await supabase.storage.from('avatars').upload(imageName, avatar);

	if (errorStorage) throw new Error(errorStorage.message);

	const { finalUser, error: error2 } = await supabase.auth.updateUser({
		data: {
			avatar: imageUrl,
		},
	});
	if (error2) throw new Error(error2.message);

	return finalUser;
}

function generateImgUrlAndName(image, user) {
	// https://liljtixfylnvgdfpkmtx.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

	const hasUploadedImg = image?.startsWith?.(supabaseUrl);
	let imageName = null,
		imageUrl = null;

	if (hasUploadedImg) {
		imageName = image.split('/').at(-1);
		imageUrl = image;
	} else {
		imageName = `${user.id}-${Date.now()}.${image.name.split('.').at(-1)}`;
		imageUrl = `${supabaseUrl}/storage/v1/object/public/avatars/${imageName}`;
	}

	return { imageName, imageUrl, hasUploadedImg };
}
