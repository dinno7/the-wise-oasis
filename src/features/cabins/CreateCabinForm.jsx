import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Textarea from '../../ui/Textarea';
import useCreateCabin from './useCreateCabin';
import useUpdateCabin from './useUpdateCabin';

const PreviewImg = styled.img`
	width: 50px;
	border-radius: 8px;
	aspect-ratio: 1/1;
	object-fit: cover;
	object-position: center;
`;

function CreateCabinForm({ onCloseModal, initialValues = {} }) {
	const { id: cabinId, ...defaultValues } = initialValues;
	const isEditSession = !!cabinId;
	const { register, handleSubmit, formState, getValues, reset } = useForm({
		defaultValues: isEditSession ? defaultValues : {},
	});

	const [cabinImgPreview, setCabinImgPreview] = useState(() => (isEditSession ? defaultValues.image : ''));
	const { errors } = formState;

	const { createCabin, isCreating } = useCreateCabin();
	const { updateCabin, isUpdating } = useUpdateCabin();

	const isWorking = isCreating || isUpdating;

	function submitForm(data) {
		const image = typeof data.image == 'string' ? data.image : data.image[0];
		const onSuccess = () => {
			reset();
			onCloseModal?.();
		};

		if (isEditSession)
			updateCabin(
				{ newCabinData: { ...data, image }, cabinId },
				{
					onSuccess,
				},
			);
		else
			createCabin(
				{ ...data, image },
				{
					onSuccess,
				},
			);
	}
	return (
		<Form onSubmit={handleSubmit(submitForm)} type={onCloseModal ? 'modal' : 'regular'}>
			<FormRow label="Cabin name" error={errors?.name?.message}>
				<Input
					type="text"
					id="name"
					disabled={isWorking}
					{...register('name', {
						required: 'This field is required',
					})}
				/>
			</FormRow>

			<FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
				<Input
					type="number"
					id="maxCapacity"
					disabled={isWorking}
					{...register('maxCapacity', {
						min: {
							value: 1,
							message: 'Capacity must be at least 1',
						},
						required: 'This field is required',
					})}
				/>
			</FormRow>

			<FormRow label="Regular price" error={errors?.regularPrice?.message}>
				<Input
					type="number"
					id="regularPrice"
					disabled={isWorking}
					{...register('regularPrice', {
						min: {
							value: 1,
							message: 'Regular price must be at least 1',
						},
						required: 'This field is required',
					})}
				/>
			</FormRow>

			<FormRow label="Discount" error={errors?.discount?.message}>
				<Input
					type="number"
					id="discount"
					defaultValue={0}
					disabled={isWorking}
					{...register('discount', {
						required: 'This field is required',
						validate: (value) => value <= getValues().regularPrice || 'Discount must be less than regular price',
					})}
				/>
			</FormRow>

			<FormRow label="Description for website" error={errors?.description?.message}>
				<Textarea
					type="number"
					id="description"
					defaultValue=""
					disabled={isWorking}
					{...register('description', {
						required: 'This field is required',
					})}
				/>
			</FormRow>

			<FormRow label="Cabin photo" error={errors?.image?.message}>
				<FileInput
					{...register('image', {
						onChange: (e) => {
							const imgUrl = URL.createObjectURL(e.target.files[0]);
							setCabinImgPreview(imgUrl);
						},
					})}
					id="image"
					type="file"
					accept="image/*"
				/>
				{cabinImgPreview && <PreviewImg src={cabinImgPreview} />}
			</FormRow>

			<FormRow>
				{/* type is an HTML attribute! */}
				<Button variation="secondary" type="reset" onClick={() => onCloseModal?.()}>
					Cancel
				</Button>
				<Button disabled={isWorking}>{isWorking ? 'Wait...' : 'Apply changes'}</Button>
			</FormRow>
		</Form>
	);
}

export default CreateCabinForm;
