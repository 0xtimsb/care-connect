import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

import Chart from 'components/Chart/Chart';
import styled from 'styled-components';

interface dataPoint {
	_id?: string;
	Heart_rate?: number;
	diastoli_bp?: number;
	systolic_bp?: number;
	temp: number;
}

interface graphPoint extends dataPoint {
	time: number;
}

const Root = styled.div`
	display: flex;
	flex-direction: column;

	padding-right: 50px;
`;

const Header = styled.h3`
	margin-left: 50px;
`;

const ChartPage = () => {
	const [graphData, setGraphData] = useState([] as graphPoint[]);
	const [response, setResponse] = useState([] as dataPoint[]);
	const [seconds, setSeconds] = useState(0);

	useEffect(() => {
		const socket = io(
			'https://careconnectapp.herokuapp.com/' || 'http://localhost:8080/'
		);
		socket.on('data', (res: dataPoint[]) => {
			setResponse((r: dataPoint[]) => [...r, ...res]);
		});
	}, []);

	useEffect(() => {
		if (seconds - 1 >= 0) {
			if (response[0]) {
				const size = 45;
				let plotData = [] as graphPoint[];
				if (graphData.length < size) {
					for (let i = 0; i < size - graphData.length - 1; i++) {
						plotData.push({
							_id: undefined,
							Heart_rate: undefined,
							diastoli_bp: undefined,
							systolic_bp: undefined,
							time: seconds - 1,
						} as graphPoint);
					}
					plotData.concat(graphData);
				} else {
					plotData = graphData.slice(1);
				}
				setGraphData([...plotData, { ...response[0], time: seconds - 1 }]);
				setResponse(response.slice(1));
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
			<Header>Heart Rate</Header>
			<Chart
				graphData={graphData}
				x_key='time'
				y_key='Heart_rate'
				color='#e0685e'
				stroke='#ffa59e'
				y_unit=''
			/>
			<Header>Diastolic Blood Pressure</Header>
			<Chart
				graphData={graphData}
				x_key='time'
				y_key='diastoli_bp'
				color='#5ce0ae'
				stroke='#9effda'
				y_unit=''
			/>
			<Header>Systolic Blood Pressure</Header>
			<Chart
				graphData={graphData}
				x_key='time'
				y_key='systolic_bp'
				color='#9d59f0'
				stroke='#ca9eff'
				y_unit=''
			/>
		</Root>
	);
};

export default ChartPage;
