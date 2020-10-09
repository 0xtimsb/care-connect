import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

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
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
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
				<Label>Name</Label>
				<Input name='name' ref={register({ required: true })} mb='12px' />
				{errors.name && 'Name is required.'}

				<Label>Email</Label>
				<Input name='email' ref={register({ required: true })} mb='12px' />
				{errors.email && 'Email is required.'}

				<Label>Phone Number</Label>
				<Input name='phoneNum' ref={register({ required: true })} mb='12px' />
				{errors.phoneNum && 'Phone Number is required.'}

				<Label>Age</Label>
				<Input name='age' ref={register({ required: true })} mb='12px' />
				{errors.age && 'Age is required.'}

				<Label>Weight</Label>
				<Input name='weight' ref={register({ required: true })} mb='12px' />
				{errors.weight && 'Weight is required.'}

				<Label>Height</Label>
				<Input name='height' ref={register({ required: true })} mb='12px' />
				{errors.height && 'Height is required.'}

				<Label>Password</Label>
				<Input name='password' ref={register({ required: true })} mb='12px' />
				{errors.password && 'Password is required.'}

				<Button type='submit'>Sign Up</Button>
			</Form>
		</Root>
	);
};

export default SignUp;
