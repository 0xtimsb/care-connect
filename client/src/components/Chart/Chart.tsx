import React, { useCallback, useEffect, useState } from 'react';
import io from 'socket.io-client';
import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
} from 'recharts';

import useWindowSize from 'hooks/useWindowSize';

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

const Chart = () => {
	const { width } = useWindowSize();

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
		console.log(graphData);
		if (response[seconds]) {
			setGraphData([...graphData, { ...response[seconds], time: seconds }]);
		}
		const interval = setInterval(() => {
			setSeconds((s) => s + 1);
		}, 1000);
		return () => {
			clearInterval(interval);
		};
	}, [seconds]);

	return (
		<AreaChart
			width={width ? width - 50 : 800}
			height={500}
			data={graphData}
			margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
		>
			<defs>
				<linearGradient id='colorPv' x1='0' y1='0' x2='0' y2='1'>
					<stop offset='5%' stopColor='#2abf8b' stopOpacity={0.8} />
					<stop offset='95%' stopColor='#ba6de3' stopOpacity={0} />
				</linearGradient>
			</defs>
			<XAxis dataKey='time' unit='s' />
			<YAxis type='number' domain={['dataMin - 100', 'dataMax + 100']} />
			<Tooltip />
			<CartesianGrid opacity={0.05} />
			<Area
				type='monotone'
				dataKey='Heart_rate'
				stroke='#03fca5'
				fillOpacity={1}
				fill='url(#colorPv)'
				isAnimationActive={false}
			/>
			<Area
				type='monotone'
				dataKey='diastoli_bp'
				stroke='#ba6de3'
				fillOpacity={1}
				fill='url(#colorPv)'
				isAnimationActive={false}
			/>
			<Area
				type='monotone'
				dataKey='systolic_bp'
				stroke='#ba6de3'
				fillOpacity={1}
				fill='url(#colorPv)'
				isAnimationActive={false}
			/>
		</AreaChart>
	);
};

export default Chart;
