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
	const [userData, setUserData] = useState(null);
	const [cookieData, setCookieData] = useState(getCookie('token'));

	const handleUserData = (data: any) => {
		setUserData(data);
	};

	const handleCookieData = () => {
		setCookieData(getCookie('token'));
	};

	return (
		<Router>
			<GlobalStyle />
			<Switch>
				{cookieData ? (
					<Route exact render={() => <AppLayout userData={userData} />} />
				) : (
					<Route
						exact
						render={() => (
							<AuthLayout
								handleUserData={handleUserData}
								handleCookieData={handleCookieData}
							/>
						)}
					/>
				)}
			</Switch>
		</Router>
	);
};

export default App;
