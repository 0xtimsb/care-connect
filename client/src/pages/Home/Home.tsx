import React from 'react';
import styled from 'styled-components';

import ChartPage from 'components/Chart/ChartPage';

const Root = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
`;

const Home = ({ userData }: any) => {
	return (
		<Root>
			<ChartPage />
		</Root>
	);
};

export default Home;
