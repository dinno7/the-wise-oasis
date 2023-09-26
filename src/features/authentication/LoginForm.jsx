import { useState } from 'react';
import toast from 'react-hot-toast';

import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRowVertical from '../../ui/FormRowVertical';
import Input from '../../ui/Input';
import SpinnerMini from '../../ui/SpinnerMini';
import useLogin from './useLogin';

function LoginForm() {
	const isDemo = import.meta.env.VITE_IS_DEMO == 'true';
	const [email, setEmail] = useState(() => (isDemo ? 'demouser@telegmail.com' : ''));
	const [password, setPassword] = useState(() => (isDemo ? '1234567812345678' : ''));
	const { login, isLoggingIn } = useLogin();

	function handleSubmit(e) {
		e.preventDefault();
		if (!email || !password) return toast.error('Please fill fields!');
		login(
			{ email, password },
			{
				onSettled: () => {
					if (!isDemo) {
						setEmail('');
						setPassword('');
					}
				},
			},
		);
	}

	return (
		<>
			{isDemo && (
				<p style={{ textAlign: 'center' }}>
					This is{' '}
					<span style={{ color: 'var(--color-brand-400)', textDecoration: 'underline', textUnderlineOffset: '5px' }}>
						DEMO
					</span>{' '}
					account, just click on Login button
				</p>
			)}
			<Form onSubmit={handleSubmit}>
				<FormRowVertical label="Email address">
					<Input
						type="email"
						id="email"
						disabled={isDemo || isLoggingIn}
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
						disabled={isDemo || isLoggingIn}
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
		</>
	);
}

export default LoginForm;
