import { useForm } from 'react-hook-form';

import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import useSignUp from './useSignUp';

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
	const { signUp, isLoading, error } = useSignUp();
	const { register, formState, getValues, handleSubmit, reset } = useForm();
	const { errors } = formState;

	function submitForm({ fullName, email, password, passwordConfirm }) {
		if (password !== passwordConfirm) return;

		signUp(
			{ fullName, email, password },
			{
				onSuccess: reset,
			},
		);
	}
	return (
		<Form onSubmit={handleSubmit(submitForm)}>
			<FormRow label="Full name" error={errors?.fullName?.message}>
				<Input {...register('fullName', { required: 'This field is require' })} type="text" id="fullName" />
			</FormRow>

			<FormRow label="Email address" error={errors?.email?.message}>
				<Input
					{...register('email', {
						required: 'This field is require',
						pattern: {
							value: /\S+@\S+\.\S+/,
							message: 'Please provide a valid email',
						},
					})}
					type="text"
					id="email"
				/>
			</FormRow>

			<FormRow label="Password (min 8 characters)" error={errors?.password?.message}>
				<Input
					{...register('password', {
						required: 'This field is require',
						minLength: {
							value: 8,
							message: 'The min length of password is 8 characters',
						},
					})}
					type="password"
					id="password"
				/>
			</FormRow>

			<FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
				<Input
					{...register('passwordConfirm', {
						required: 'This field is require',
						validate: (val) => val === getValues().password || 'Password fields must have same value',
					})}
					type="password"
					id="passwordConfirm"
				/>
			</FormRow>

			<FormRow>
				{/* type is an HTML attribute! */}
				<Button variation="secondary" type="reset">
					Cancel
				</Button>
				<Button>Create new user</Button>
			</FormRow>
		</Form>
	);
}

export default SignupForm;
