import React from 'react';
import { useForm } from 'react-hook-form';
import styled, { css } from 'styled-components';

// Styled.
import Panel from 'styled/Panel';
import Input from 'styled/Input';
import Button from 'styled/Button';
import Label from 'styled/Label';

// API
import axios from 'utils/api';

interface IFormInput {
	name: string;
	email: string;
	phoneNum: string;
	age: number;
	weight: number;
	height: number;
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

const HFlex = styled.div`
	display: flex;
	margin-bottom: 12px;
`;

interface VFlexProps {
	ml?: string;
	mr?: string;
}

const VFlex = styled.div<VFlexProps>`
	display: flex;
	flex-direction: column;

	${(p) =>
		p.ml &&
		css`
			margin-left: ${p.ml};
		`}
	${(p) =>
		p.mr &&
		css`
			margin-right: ${p.mr};
		`}
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

const SignUp = ({ store, setStore }: any) => {
	const { register, errors, handleSubmit } = useForm<IFormInput>({
		mode: 'all',
	});

	const onSubmit = (data: IFormInput) => {
		axios
			.post('signup', {
				name: data.name,
				signupEmail: data.email,
				phoneNum: data.phoneNum,
				age: data.age,
				weight: data.weight,
				height: data.height,
				signupPassword: data.password,
			})
			.then((res) => {
				console.log(res.data);
				setStore({ ...res.data });
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<Root>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<Header>Create an account</Header>
				<MinLabel mb='7px' mt='15px'>
					Name
				</MinLabel>
				<Input
					name='name'
					ref={register({
						required: { value: true, message: 'Name required.' },
					})}
					mb='12px'
				/>
				<Error>{errors.name && errors.name.message}</Error>

				<MinLabel mb='7px'>Email</MinLabel>
				<Input
					name='email'
					ref={register({
						required: { value: true, message: 'Email required.' },
						pattern: {
							value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
							message: 'Invalid email address.',
						},
					})}
					mb='12px'
				/>
				<Error>{errors.email && errors.email.message}</Error>

				<MinLabel mb='7px'>Phone Number</MinLabel>
				<Input
					name='phoneNum'
					ref={register({
						required: { value: true, message: 'Phone Number required.' },
						pattern: {
							value: /^[0-9+]*$/,
							message: 'Invalid Phone Number.',
						},
						minLength: {
							value: 10,
							message: 'Invalid Phone Number.',
						},
					})}
					mb='12px'
				/>
				<Error>{errors.phoneNum && errors.phoneNum.message}</Error>

				<HFlex>
					<VFlex mr='12px'>
						<MinLabel mb='7px'>Age</MinLabel>
						<Input
							name='age'
							ref={register({
								required: { value: true, message: 'Age required.' },
								pattern: {
									value: /^[0-9]*$/,
									message: 'Invalid Age.',
								},
								max: {
									value: 100,
									message: 'Invalid Age.',
								},
							})}
						/>
					</VFlex>
					<VFlex>
						<MinLabel mb='7px'>Weight</MinLabel>
						<Input
							name='weight'
							ref={register({
								required: { value: true, message: 'Weight required.' },
								pattern: {
									value: /^[0-9]*$/,
									message: 'Invalid Weight.',
								},
							})}
						/>
					</VFlex>
					<VFlex ml='12px'>
						<MinLabel mb='7px'>Height</MinLabel>
						<Input
							name='height'
							ref={register({
								required: { value: true, message: 'Height required.' },
								pattern: {
									value: /^[0-9]*$/,
									message: 'Invalid Height.',
								},
							})}
						/>
					</VFlex>
				</HFlex>

				<Error>{errors.age && errors.age.message}</Error>
				<Error>{errors.weight && errors.weight.message}</Error>
				<Error>{errors.height && errors.height.message}</Error>

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

				<Button type='submit'>Sign Up</Button>
			</Form>
		</Root>
	);
};

export default SignUp;
