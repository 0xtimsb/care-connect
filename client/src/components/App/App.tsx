import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Components
import { GlobalStyle } from 'components/App/GlobalStyles';
import AppLayout from 'components/App/AppLayout';

// Pages
import AuthLayout from 'pages/Auth/AuthLayout';

// Utils.
import axios from 'utils/api';
import { getCookie } from 'utils/cookie';

const App = () => {
	const [userData, setUserData] = useState(null);

	const handleUserData = (data: any) => {
		setUserData(data);
	};

	useEffect(() => {
		if (!userData && getCookie('token')) {
			axios
				.get('', {
					headers: {
						Authorization: `bearer ${getCookie('token')}`,
					},
				})
				.then(({ data }) => {
					handleUserData({ ...data.userData });
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, [userData]);

	return (
		<Router>
			<GlobalStyle />
			<Switch>
				{userData ? (
					<Route
						exact
						render={() => (
							<AppLayout userData={userData} handleUserData={handleUserData} />
						)}
					/>
				) : (
					<Route
						exact
						render={() => <AuthLayout handleUserData={handleUserData} />}
					/>
				)}
			</Switch>
		</Router>
	);
};

export default App;
