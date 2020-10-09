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

const SignUp = ({ store, setStore }: any) => {
	const { register, errors, handleSubmit } = useForm<IFormInput>();

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
				<Input name='name' ref={register({ required: true })} mb='12px' />
				{errors.name && 'Name is required.'}

				<MinLabel mb='7px'>Email</MinLabel>
				<Input name='email' ref={register({ required: true })} mb='12px' />
				{errors.email && 'Email is required.'}

				<MinLabel mb='7px'>Phone Number</MinLabel>
				<Input name='phoneNum' ref={register({ required: true })} mb='12px' />
				{errors.phoneNum && 'Phone Number is required.'}

				<HFlex>
					<VFlex mr='12px'>
						<MinLabel mb='7px'>Age</MinLabel>
						<Input name='age' ref={register({ required: true })} />
					</VFlex>
					<VFlex>
						<MinLabel mb='7px'>Weight</MinLabel>
						<Input name='weight' ref={register({ required: true })} />
					</VFlex>
					<VFlex ml='12px'>
						<MinLabel mb='7px'>Height</MinLabel>
						<Input name='height' ref={register({ required: true })} />
					</VFlex>
				</HFlex>

				{errors.age && 'Age is required.'}
				{errors.weight && 'Weight is required.'}
				{errors.height && 'Height is required.'}

				<MinLabel mb='5px'>Password</MinLabel>
				<Input
					name='password'
					ref={register({ required: true })}
					mb='12px'
					type='password'
				/>
				{errors.password && 'Password is required.'}

				<Button type='submit'>Sign Up</Button>
			</Form>
		</Root>
	);
};

export default SignUp;
