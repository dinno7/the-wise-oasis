import Empty from '../../ui/Empty';
import Menus from '../../ui/Menus';
import Pagination from '../../ui/Pagination';
import Spinner from '../../ui/Spinner';
import Table from '../../ui/Table';
import BookingRow from './BookingRow';
import useBookings from './useBookings';

function BookingTable() {
	const { data: bookings, count, isLoading } = useBookings();

	if (isLoading) return <Spinner />;

	if (!bookings.length) return <Empty resource="Bookings" />;

	return (
		<Menus>
			<Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
				<Table.Head>
					<div>Cabin</div>
					<div>Guest</div>
					<div>Dates</div>
					<div>Status</div>
					<div>Amount</div>
					<div></div>
				</Table.Head>

				<Table.Body data={bookings} render={(booking) => <BookingRow key={booking.id} booking={booking} />} />

				<Table.Foot>
					<Pagination count={count} />
				</Table.Foot>
			</Table>
		</Menus>
	);
}

export default BookingTable;