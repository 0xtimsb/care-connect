import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useMutation } from '@apollo/client';

// ComponentsS
import Head from 'components/Head';

// GraphQL
import { LOGIN, ME } from 'graphql/user';

// Styled
import Panel from 'styled/Panel';
import Spacing from 'styled/Spacing';
import Header from 'styled/Header';
import SubHeader from 'styled/SubHeader';
import Input from 'styled/Input';
import Button from 'styled/Button';
import Error from 'styled/Error';
import Link from 'styled/Link';

// Others
import { HOME } from 'routes';

const LogIn = ({ history, refetch }: any) => {
	const [error, setError] = useState('');

	const [userInfo, setUserInfo] = useState({
		usernameOrEmail: '',
		password: '',
	});

	const { usernameOrEmail, password } = userInfo;

	const [login, { loading, error: apiError }] = useMutation(LOGIN);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setUserInfo({ ...userInfo, [name]: value });
	};

	const isValidEmail = (email: string) => {
		const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (!emailRegex.test(String(email).toLowerCase())) {
			return false;
		}
		return true;
	};

	const isValidUsername = (username: string) => {
		const usernameRegex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;
		if (!usernameRegex.test(username)) {
			return false;
		} else if (username.length < 4 || username.length > 20) {
			return false;
		}
		return true;
	};

	const validate = () => {
		if (!usernameOrEmail || !password) {
			return 'All fields are required';
		}

		if (password.length < 6) {
			return 'Password must be 6 or more in length.';
		}

		if (!isValidEmail(usernameOrEmail) && !isValidUsername(usernameOrEmail)) {
			return 'Not valid username or email.';
		}

		return false;
	};

	const handleSubmit = () => {
		const error = validate();

		if (error) {
			setError(error);
			return;
		} else {
			setError('');
		}

		login({
			variables: {
				usernameOrEmail,
				password,
			},
		}).then(({ data }) => {
			console.log(data);
			refetch(ME);
			history.push(HOME);
		});
	};

	const renderErrors = (apiError: any) => {
		let errorMessage;

		if (error) {
			errorMessage = error;
		} else if (apiError) {
			errorMessage = apiError.graphQLErrors[0].message;
		}

		if (errorMessage) {
			return (
				<Spacing bottom='20px'>
					<Error>{errorMessage}</Error>
				</Spacing>
			);
		}

		return null;
	};

	return (
		<>
			<Head />
			<Panel width='480px' padding='32px'>
				<Spacing bottom='20px'>
					<Header>Welcome back!</Header>
				</Spacing>
				<Spacing bottom='8px'>
					<SubHeader>USERNAME OR EMAIL</SubHeader>
				</Spacing>
				<Spacing bottom='20px'>
					<Input
						name='usernameOrEmail'
						value={usernameOrEmail}
						onChange={handleChange}
					/>
				</Spacing>
				<Spacing bottom='8px'>
					<SubHeader>PASSWORD</SubHeader>
				</Spacing>
				<Spacing bottom='20px'>
					<Input
						name='password'
						value={password}
						onChange={handleChange}
						type='password'
					/>
				</Spacing>
				{renderErrors(apiError)}
				<Spacing bottom='10px'>
					<Button disabled={loading} colored={true} onClick={handleSubmit}>
						Continue
					</Button>
				</Spacing>
				<Spacing>
					<Link to='/signup'>Don't have an account?</Link>
				</Spacing>
			</Panel>
		</>
	);
};

export default withRouter(LogIn);
