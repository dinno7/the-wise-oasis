import { eachDayOfInterval, format, isSameDay, subDays } from 'date-fns';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import styled from 'styled-components';

import { useDarkMode } from '../../contexts/DarkModeContext';
import Heading from '../../ui/Heading';
import DashboardBox from './DashboardBox';

const StyledSalesChart = styled(DashboardBox)`
	grid-column: 1 / -1;
	height: 500px;

	/* Hack to change grid line colors */
	& .recharts-cartesian-grid-horizontal line,
	& .recharts-cartesian-grid-vertical line {
		stroke: var(--color-grey-300);
	}
`;

function SalesChart({ bookings, numDays }) {
	const { isDark } = useDarkMode();
	const colors = isDark
		? {
				totalSales: { stroke: '#4f46e5', fill: '#4f46e5' },
				extrasSales: { stroke: '#22c55e', fill: '#22c55e' },
				text: '#e5e7eb',
				background: '#18212f',
		  }
		: {
				totalSales: { stroke: '#4f46e5', fill: '#c7d2fe' },
				extrasSales: { stroke: '#16a34a', fill: '#dcfce7' },
				text: '#374151',
				background: '#fff',
		  };

	const allDates = eachDayOfInterval({
		start: subDays(new Date(), numDays - 1),
		end: new Date(),
	});

	const data = allDates.map((date) => {
		return {
			label: format(date, 'MMM dd'),
			totalSales: bookings
				.filter((booking) => isSameDay(date, new Date(booking.created_at)))
				.reduce((acc, cur) => acc + cur.totalPrice, 0),
			extrasSales: bookings
				.filter((booking) => isSameDay(date, new Date(booking.created_at)))
				.reduce((acc, cur) => acc + cur.extrasPrice, 0),
		};
	});

	return (
		<StyledSalesChart>
			<Heading as="h2">
				Sales from {format(allDates.at(0), 'MMM dd yyyy')} &mdash; {format(allDates.at(-1), 'MMM dd yyyy')}
			</Heading>

			<ResponsiveContainer width="100%" height="100%">
				<AreaChart width={500} height={400} data={data}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis tick={{ fill: colors.text }} tickLine={{ stroke: colors.text }} dataKey="label" />
					<YAxis tick={{ fill: colors.text }} tickLine={{ stroke: colors.text }} unit="$" />
					<Tooltip contentStyle={{ backgroundColor: colors.background }} />
					<Area
						name="Total sales"
						strokeWidth={2}
						type="monotone"
						dataKey="totalSales"
						stroke={colors.totalSales.stroke}
						fill={colors.totalSales.fill}
					/>
					<Area
						name="Extra sales"
						strokeWidth={2}
						type="monotone"
						dataKey="extrasSales"
						stroke={colors.extrasSales.stroke}
						fill={colors.extrasSales.fill}
					/>
				</AreaChart>
			</ResponsiveContainer>
		</StyledSalesChart>
	);
}

export default SalesChart;
