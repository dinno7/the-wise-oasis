import { useState } from 'react';

import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRowVertical from '../../ui/FormRowVertical';
import Input from '../../ui/Input';
import SpinnerMini from '../../ui/SpinnerMini';
import useLogin from './useLogin';

function LoginForm() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { login, isLoggingIn } = useLogin();

	function handleSubmit(e) {
		e.preventDefault();
		login(
			{ email, password },
			{
				onSettled: () => {
					setEmail('');
					setPassword('');
				},
			},
		);
	}

	return (
		<Form onSubmit={handleSubmit}>
			<FormRowVertical label="Email address">
				<Input
					type="email"
					id="email"
					disabled={isLoggingIn}
					// This makes this form better for password managers
					autoComplete="username"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</FormRowVertical>
			<FormRowVertical label="Password">
				<Input
					type="password"
					id="password"
					disabled={isLoggingIn}
					autoComplete="current-password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</FormRowVertical>
			<FormRowVertical>
				<Button size="large" disabled={isLoggingIn}>
					{isLoggingIn ? <SpinnerMini /> : 'Login'}
				</Button>
			</FormRowVertical>
		</Form>
	);
}

export default LoginForm;
