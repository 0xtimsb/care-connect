import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';

import background from 'images/background-4.jpg';

// Pages
import LogIn from 'pages/Auth/LogIn';
import SignUp from 'pages/Auth/SignUp';

// Others
import { LOG_IN, SIGN_UP } from 'routes';
import Panel from 'styled/Panel';

const Root = styled.div`
	width: 100%;
	height: 100vh;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	background-image: url(${background});
	background-position: center;
	background-size: cover;
`;

const Header = styled(Panel)`
	margin-bottom: 20px;
	width: 420px;
	padding: 16px;
	font-size: 26px;
	font-weight: bold;
	display: flex;
	justify-content: center;
	align-items: center;
	box-shadow: ${(p) => p.theme.shadows.xl};
`;

const AuthLayout = ({ handleUserData }: any) => {
	return (
		<Root>
			<Header>Welcome to Care Connect</Header>
			<Switch>
				<Route
					exact
					path={LOG_IN}
					render={() => <LogIn handleUserData={handleUserData} />}
				/>
				<Route
					exact
					path={SIGN_UP}
					render={() => <SignUp handleUserData={handleUserData} />}
				/>
				<Redirect to={SIGN_UP} />
			</Switch>
		</Root>
	);
};

export default AuthLayout;
