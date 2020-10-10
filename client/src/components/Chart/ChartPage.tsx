import React, { useCallback, useEffect, useState } from 'react';
import io from 'socket.io-client';

import Chart from 'components/Chart/Chart';
import styled from 'styled-components';

interface dataPoint {
	_id: string;
	Heart_rate: number;
	diastoli_bp: number;
	systolic_bp: number;
	temp: number;
}

interface graphPoint extends dataPoint {
	time: number;
}

const Root = styled.div`
	display: flex;
	flex-direction: column;
`;

const ChartPage = () => {
	const [graphData, setGraphData] = useState([] as graphPoint[]);
	const [response, setResponse] = useState([] as dataPoint[]);
	const [seconds, setSeconds] = useState(0);

	useEffect(() => {
		const socket = io('http://localhost:4000/');
		socket.on('data', (res: dataPoint[]) => {
			setResponse((r: dataPoint[]) => [...r, ...res]);
		});
	}, []);

	useEffect(() => {
		if (seconds - 1 >= 0) {
			if (response[seconds - 1]) {
				setGraphData([
					...graphData,
					{ ...response[seconds - 1], time: seconds - 1 },
				]);
			} else {
				console.log('Data not found!');
			}
		}
		const interval = setInterval(() => {
			setSeconds((s) => s + 1);
		}, 1000);
		return () => {
			clearInterval(interval);
		};
	}, [seconds]);

	return (
		<Root>
			<Chart
				graphData={graphData}
				x_key='time'
				y_key='Heart_rate'
				color='#878787'
				stroke='#242424'
			/>
			<Chart
				graphData={graphData}
				x_key='time'
				y_key='diastoli_bp'
				color='#878787'
				stroke='#242424'
			/>
			<Chart
				graphData={graphData}
				x_key='time'
				y_key='systolic_bp'
				color='#878787'
				stroke='#242424'
			/>
		</Root>
	);
};

export default ChartPage;
