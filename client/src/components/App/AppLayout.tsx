import React, { useEffect, useState, useRef } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';

// Components.
// import Header from 'components/App/Header';
// import NotFound from 'components/NotFound';
// import SideBar from './SideBar';
// import UserSuggestions from './UserSuggestions';

// Pages.
import Home from 'pages/Home/Home';
// import Profile from 'pages/Profile';
// import Explore from 'pages/Explore';
// import People from 'pages/People';
// import Notifications from 'pages/Notifications';
// import Post from 'pages/Post';
// import Messages from 'pages/Messages';

// Hooks.
import useWindowSize from 'hooks/useWindowSize';
import useClickOutside from 'hooks/useClickOutside';

// Routes.
import { HOME } from 'routes';

// Store.
import { useStore } from 'store/store';
import { SET_AUTH_USER } from 'store/auth';

const Root = styled.div`
	display: flex;
	flex-direction: row;
	margin: 0 auto;
	width: 100%;
	position: relative;
`;

const AppLayout = ({ location, authUser }: any) => {
	const [{ auth }, dispatch] = useStore();

	useEffect(() => {
		dispatch({ type: SET_AUTH_USER, payload: authUser });
	}, [dispatch, authUser]);

	if (!auth.user) return null;

	return (
		<Root>
			<Switch>
				<Route exact path={HOME} component={Home} />
			</Switch>
		</Root>
	);
};

export default withRouter(AppLayout);
