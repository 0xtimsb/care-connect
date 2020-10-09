import React from 'react';
import styled from 'styled-components';

const Root = styled.div`
	width: 100%;
	height: 100vh;

	display: flex;
	justify-content: center;
	align-items: center;
`;

const Home = ({ userData }: any) => {
	return <Root>'Home (You are logged in!)'</Root>;
};

export default Home;
