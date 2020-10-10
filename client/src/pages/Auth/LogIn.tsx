import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled, { css } from 'styled-components';
import { withRouter, Link as RouterLink } from 'react-router-dom';

// Styled.
import Panel from 'styled/Panel';
import Input from 'styled/Input';
import Button from 'styled/Button';
import Label from 'styled/Label';

// API
import axios from 'utils/api';
import { setCookie } from 'utils/cookie';

interface IFormInput {
	email: string;
	password: string;
}

const Root = styled(Panel)`
	padding: 16px;
	width: 420px;
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
`;

const MinLabel = styled(Label)`
	font-size: 10px;
	font-weight: bold;
	letter-spacing: 1px;
	text-transform: uppercase;
	color: ${(p) => p.theme.colors.text.secondary};
`;

const Header = styled.label`
	display: flex;
	justify-content: center;

	font-size: 24px;
	font-weight: bold;
`;

const Error = styled.label`
	font-size: 10px;
	font-weight: bold;
	letter-spacing: 1px;
	text-transform: uppercase;
	color: ${(p) => p.theme.colors.error};
	margin-bottom: 10px;
`;

const Link = styled(RouterLink)`
	font-size: 10px;
	font-weight: bold;
	letter-spacing: 1px;
	text-transform: uppercase;
	color: ${(p) => p.theme.colors.main};
	margin-top: 10px;
	text-decoration: none;
`;

const LogIn = ({ handleUserData, history }: any) => {
	const [loading, setLoading] = useState(false);

	const { register, errors, handleSubmit } = useForm<IFormInput>({
		mode: 'all',
	});

	const onSubmit = (data: IFormInput) => {
		setLoading(true);
		axios
			.post('login', {
				loginEmail: data.email,
				loginPassword: data.password,
			})
			.then(({ data }) => {
				history.push('/');
				setCookie('token', data.data.token);
				handleUserData({ ...data.data.userData });
			})
			.catch((err) => {
				console.log(err);
				setLoading(false);
			});
	};

	return loading ? (
		<Root>
			<Header>Loading...</Header>
		</Root>
	) : (
		<Root>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<Header>Welcome Back!</Header>

				<MinLabel mb='7px'>Email</MinLabel>
				<Input
					name='email'
					ref={register({
						required: { value: true, message: 'Email required.' },
						pattern: {
							value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
							message: 'Invalid email address.',
						},
					})}
					mb='12px'
				/>
				<Error>{errors.email && errors.email.message}</Error>

				<MinLabel mb='5px'>Password</MinLabel>
				<Input
					name='password'
					ref={register({
						required: { value: true, message: 'Password required.' },
						minLength: {
							value: 6,
							message: 'Min length is 6.',
						},
						maxLength: {
							value: 30,
							message: 'Max length is 30.',
						},
					})}
					mb='12px'
					type='password'
				/>
				<Error>{errors.password && errors.password.message}</Error>

				<Button type='submit'>Log In</Button>
				<Link to='/signup'>Need an account? Register</Link>
			</Form>
		</Root>
	);
};

export default withRouter(LogIn);
