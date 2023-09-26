import styled from 'styled-components';

import Spinner from '../../ui/Spinner';
import useCabins from '../cabins/useCabins';
import TodayActivity from '../check-in-out/TodayActivity';
import DurationChart from './DurationChart';
import SalesChart from './SalesChart';
import Stats from './Stats';
import useResentBookings from './useResentBookings';
import useResentStays from './useResentStays';

const StyledDashboardLayout = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	grid-template-rows: auto 34rem auto;
	gap: 2.4rem;
`;

function DashboardLayout() {
	const { bookings, isLoading: isLoading1 } = useResentBookings();
	const { numDays, confirmedStays, isLoading: isLoading2 } = useResentStays();
	const { cabins, isLoading: isLoading3 } = useCabins();

	const isLoading = isLoading1 || isLoading2 || isLoading3;

	if (isLoading) return <Spinner />;
	return (
		<StyledDashboardLayout>
			<Stats bookings={bookings} confirmedStays={confirmedStays} numDays={numDays} cabinCount={cabins.length} />
			<TodayActivity />
			<DurationChart confirmStays={confirmedStays} />
			<SalesChart bookings={bookings} numDays={numDays} />
		</StyledDashboardLayout>
	);
}

export default DashboardLayout;
