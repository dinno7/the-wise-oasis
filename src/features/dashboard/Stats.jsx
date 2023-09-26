import { HiOutlineBanknotes, HiOutlineBriefcase, HiOutlineCalendar, HiOutlineChartBar } from 'react-icons/hi2';

import { formatCurrency } from '../../utils/helpers';
import Stat from './Stat';

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
	const numBookings = bookings.length;

	const sales = bookings.reduce((acc, curr) => acc + curr.totalPrice, 0);

	const checkIns = confirmedStays.length;

	const occupation = confirmedStays.reduce((acc, curr) => acc + curr.numNights, 0) / (numDays * cabinCount);
	return (
		<>
			<Stat title="Bookings" value={numBookings} color="blue" icon={<HiOutlineBriefcase />} />
			<Stat title="Sales" value={formatCurrency(sales)} color="green" icon={<HiOutlineBanknotes />} />
			<Stat title="Check ins" value={checkIns} color="indigo" icon={<HiOutlineCalendar />} />
			<Stat
				title="Occupancy rate"
				value={(occupation * 100).toFixed(1) + '%'}
				color="yellow"
				icon={<HiOutlineChartBar />}
			/>
		</>
	);
}

export default Stats;
