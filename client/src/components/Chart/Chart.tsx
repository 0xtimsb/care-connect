import React, { useEffect, useState } from 'react';
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
	time: number;
	value?: number;
}

const Chart = () => {
	const { width, height } = useWindowSize();

	const [data, setData] = useState([] as dataPoint[]);

	useEffect(() => {
		setTimeout(() => {
			const size = 60;
			let newData = [];
			if (data.length === 0) {
				for (let i = 0; i < size; i++) {
					newData.push({ value: undefined, time: i - size });
				}
			} else {
				newData = data.slice(1);
				newData.push({
					value: parseFloat((700 + Math.random() * 100).toFixed(2)), // Random data
					time: data[data.length - 1].time + 1,
				});
			}
			setData(newData);
		}, 1000);
	}, [data]);

	return (
		<AreaChart
			width={width ? width - 50 : 800}
			height={500}
			data={data}
			margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
		>
			<defs>
				<linearGradient id='colorPv' x1='0' y1='0' x2='0' y2='1'>
					<stop offset='5%' stopColor='#2abf8b' stopOpacity={0.8} />
					<stop offset='95%' stopColor='#2abf8b' stopOpacity={0} />
				</linearGradient>
			</defs>
			<XAxis dataKey='time' unit='s' />
			<YAxis type='number' domain={['dataMin - 200', 'dataMax + 200']} />
			<Tooltip />
			<CartesianGrid opacity={0.05} />
			<Area
				type='monotone'
				dataKey='value'
				stroke='#03fca5'
				fillOpacity={1}
				fill='url(#colorPv)'
				isAnimationActive={false}
			/>
		</AreaChart>
	);
};

export default Chart;
