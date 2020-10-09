import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

// Pages.
import Home from 'pages/Home/Home';

// Routes.
import { HOME } from 'routes';

const Root = styled.div``;

const AppLayout = ({ userData }: any) => {
	return (
		<Root>
			<Switch>
				<Route exact path={HOME} render={() => <Home userData={userData} />} />
				<Redirect to={HOME} />
			</Switch>
		</Root>
	);
};

export default AppLayout;
