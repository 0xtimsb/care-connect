import React from 'react';
import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
} from 'recharts';

import useWindowSize from 'hooks/useWindowSize';

interface ChartProps {
	graphData: any[];
	x_key: string;
	y_key: string;
	color: string;
	stroke: string;
}

const Chart = ({ graphData, x_key, y_key, color, stroke }: ChartProps) => {
	const { width } = useWindowSize();

	return (
		<AreaChart
			width={width! * 0.8}
			height={180}
			data={graphData}
			margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
			syncId='id'
		>
			<defs>
				<linearGradient id={color} x1='0' y1='0' x2='0' y2='1'>
					<stop offset='5%' stopColor={color} stopOpacity={0.8} />
					<stop offset='95%' stopColor={color} stopOpacity={0} />
				</linearGradient>
			</defs>
			<XAxis dataKey={x_key} unit='s' />
			<YAxis type='number' domain={[`dataMin - 50`, `dataMax + 50`]} />
			<Tooltip />
			<CartesianGrid opacity={0.05} />
			<Area
				type='monotone'
				dataKey={y_key}
				stroke={stroke}
				fillOpacity={1}
				fill={`url(#${color})`}
				isAnimationActive={false}
			/>
		</AreaChart>
	);
};

export default Chart;
