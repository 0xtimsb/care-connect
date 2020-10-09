import React from 'react';
import styled from 'styled-components';

import Chart from 'components/Chart/Chart';

const Root = styled.div`
	width: 100%;
	height: 100vh;

	display: flex;
	justify-content: center;
	align-items: flex-end;
`;

const Home = ({ userData }: any) => {
	return (
		<Root>
			<Chart />
		</Root>
	);
};

export default Home;
