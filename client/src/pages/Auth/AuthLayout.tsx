import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

// Pages
// import LogIn from 'pages/Auth/LogIn';
import SignUp from 'pages/Auth/SignUp';

// Others
import { HOME, LOG_IN, SIGN_UP } from 'routes';

const Root = styled.div`
	width: 100%;
	height: 100vh;

	display: flex;
	justify-content: center;
	align-items: center;
`;

const AuthLayout = ({ handleUserData, handleCookieData, history }: any) => {
	useEffect(() => {
		history.push('/signup');
	}, []);

	return (
		<Root>
			<Switch>
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
				{/* <Route exact path={LOG_IN} render={() => <LogIn store setStore />} /> */}
				<Redirect to={HOME} />
			</Switch>
		</Root>
	);
};

export default withRouter(AuthLayout);
