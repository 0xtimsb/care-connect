import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import Home from 'pages/Home/Home';
import Navbar from 'components/Navbar';

// Routes.
import { HOME } from 'routes';

const Root = styled.div``;

const AppLayout = ({ userData }: any) => {
	return (
		<Root>
			<Navbar />
			<Switch>
				<Route exact path={HOME} render={() => <Home userData={userData} />} />
				<Redirect to={HOME} />
			</Switch>
		</Root>
	);
};

export default AppLayout;
