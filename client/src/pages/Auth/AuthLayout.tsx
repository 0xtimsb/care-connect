import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';

// Pages
import LogIn from 'pages/Auth/LogIn';
import SignUp from 'pages/Auth/SignUp';

// Others
import { LOG_IN, SIGN_UP } from 'routes';

const Root = styled.div`
	width: 100%;
	height: 100vh;

	display: flex;
	justify-content: center;
	align-items: center;
`;

const AuthLayout = ({ handleUserData, handleCookieData }: any) => {
	return (
		<Root>
			<Switch>
				<Route
					exact
					path={LOG_IN}
					render={() => (
						<LogIn
							handleUserData={handleUserData}
							handleCookieData={handleCookieData}
						/>
					)}
				/>
				<Route
					exact
					path={SIGN_UP}
					render={() => (
						<SignUp
							handleUserData={handleUserData}
							handleCookieData={handleCookieData}
						/>
					)}
				/>
				<Redirect to={SIGN_UP} />
			</Switch>
		</Root>
	);
};

export default AuthLayout;
