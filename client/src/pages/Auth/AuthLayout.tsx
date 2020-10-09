import React, { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';

// Pages
import LogIn from 'pages/Auth/LogIn';
import SignUp from 'pages/Auth/SignUp';

// Others
import { HOME, LOG_IN, SIGN_UP } from 'routes';

// Styled
import Container from 'styled/Container';

const Root = styled(Container)``;

const AuthLayout = ({ store, setStore }: any) => (
	<Root w='100%' h='100vh'>
		<Container w='100%' h='100vh' flex='row'>
			<Switch>
				<Route exact path={SIGN_UP} render={() => <SignUp store setStore />} />
				<Route exact path={LOG_IN} render={() => <LogIn store setStore />} />
				<Redirect to={HOME} />
			</Switch>
		</Container>
	</Root>
);

export default AuthLayout;
