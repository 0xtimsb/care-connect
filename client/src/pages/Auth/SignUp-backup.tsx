import React, { useEffect, useState } from 'react';

// Styled
import Container from 'styled/Container';
import Panel from 'styled/Panel';
import Spacing from 'styled/Spacing';
import Header from 'styled/Header';
import SubHeader from 'styled/SubHeader';
import Input from 'styled/Input';
import Button from 'styled/Button';
import Error from 'styled/Error';
import Link from 'styled/Link';
import Text from 'styled/Text';

const SignUp = ({ userInfo, handleUserInfo, handleCodeSent }: any) => {
	const [error, setError] = useState('');
	const [sendCode, { data, loading, error: apiError }] = useMutation(SEND_CODE);

	const { day, month, year, email, password, username } = userInfo;

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		handleUserInfo({ ...userInfo, [name]: value });
	};

	const handleDateChange = ({
		name,
		value,
	}: {
		name: string;
		value: number;
	}) => {
		handleUserInfo({ ...userInfo, [name]: value });
	};

	const validate = () => {
		if (
			!email ||
			!username ||
			!password ||
			day === undefined ||
			month === undefined ||
			year === undefined
		) {
			return 'All fields are required';
		}

		const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (!emailRegex.test(String(email).toLowerCase())) {
			return 'Enter a valid email address.';
		}

		const usernameRegex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;
		if (!usernameRegex.test(username)) {
			return 'Username can only use letters, numbers, underscores and periods';
		} else if (username.length < 4 || username.length > 20) {
			return 'Username must be of 4 to 32 characters';
		}

		if (password.length < 6) {
			return 'Password must be 6 or more in length.';
		}

		const date = new Date(year!, month!, day);
		if (
			date.getFullYear() !== year ||
			date.getMonth() !== month ||
			date.getDate() !== day
		) {
			return 'Date must be valid.';
		}

		return false;
	};

	const handleSubmit = () => {
		const error = validate();
		if (error) {
			setError(error);
			return false;
		}

		sendCode({
			variables: {
				email,
			},
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

	useEffect(() => {
		if (data) {
			if (data.sendCode) {
				handleCodeSent();
			} else {
				console.log('Something went wrong!');
			}
		}
	}, [data, handleCodeSent]);

	return (
		<>
			<Head />
			<Panel width='480px' padding='32px'>
				<Spacing bottom='20px'>
					<Header>Create a account</Header>
				</Spacing>
				<Spacing bottom='8px'>
					<SubHeader>EMAIL</SubHeader>
				</Spacing>
				<Spacing bottom='20px'>
					<Input
						name='email'
						value={email}
						onChange={handleChange}
						autoFocus={true}
					/>
				</Spacing>
				<Spacing bottom='8px'>
					<SubHeader>USERNAME</SubHeader>
				</Spacing>
				<Spacing bottom='20px'>
					<Input name='username' value={username} onChange={handleChange} />
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
				<Spacing bottom='8px'>
					<SubHeader>DATE OF BIRTH</SubHeader>
				</Spacing>
				<Spacing bottom='20px'>
					<Container flex='row' justify='space-between'>
						<Container w='154px'>
							<DropDown
								name='Month'
								value={month && months[month!]}
								options={months}
								callback={(option: string) => {
									const monthNum = months.findIndex(
										(value) => value === option
									);
									handleDateChange({ name: 'month', value: monthNum });
								}}
							/>
						</Container>
						<Container w='100px'>
							<DropDown
								name='Day'
								value={day}
								options={days}
								callback={(option: number) => {
									handleDateChange({ name: 'day', value: option });
								}}
							/>
						</Container>
						<Container w='120px'>
							<DropDown
								name='Year'
								value={year}
								options={years}
								callback={(option: number) => {
									handleDateChange({ name: 'year', value: option });
								}}
							/>
						</Container>
					</Container>
				</Spacing>
				{renderErrors(apiError)}
				<Spacing bottom='10px'>
					<Button disabled={loading} colored={true} onClick={handleSubmit}>
						Continue
					</Button>
				</Spacing>
				<Spacing>
					<Link to='/login'>Already have an account?</Link>
				</Spacing>
				<Spacing top='20px'>
					<Text color='text.disabled' size='xxxs'>
						By registering, you agree to Company's Terms of Service and Privacy
						Policy.
					</Text>
				</Spacing>
			</Panel>
		</>
	);
};

export default SignUp;
