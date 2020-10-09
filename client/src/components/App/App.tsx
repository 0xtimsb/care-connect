import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';

// Components
import { GlobalStyle } from 'components/App/GlobalStyles';
import AppLayout from 'components/App/AppLayout';

// Pages
import AuthLayout from 'pages/Auth/AuthLayout';

// Utils.
import { getCookie } from 'utils/cookie';

const App = () => {
	const [store, setStore] = useState({
		userData: null,
		cookie: getCookie('token'),
	});

	return (
		<Router>
			<GlobalStyle />
			<Switch>
				{store.cookie ? (
					<Route exact render={() => <AppLayout store setStore />} />
				) : (
					<Route exact render={() => <AuthLayout store setStore />} />
				)}
			</Switch>
		</Router>
	);
};

export default App;
