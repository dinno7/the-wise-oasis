import { format, isToday } from 'date-fns';
import { useState } from 'react';
import { HiArrowDownOnSquare, HiArrowUpOnSquare, HiEllipsisVertical, HiEye, HiTrash } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import ConfirmDelete from '../../ui/ConfirmDelete';
import Menus from '../../ui/Menus';
import Modal from '../../ui/Modal';
import Table from '../../ui/Table';
import Tag from '../../ui/Tag';
import { formatCurrency } from '../../utils/helpers';
import { formatDistanceFromNow } from '../../utils/helpers';
import useCheckout from '../check-in-out/useCheckout';
import useDeleteBooking from './useDeleteBooking';

const Cabin = styled.div`
	font-size: 1.6rem;
	font-weight: 600;
	color: var(--color-grey-600);
	font-family: 'Sono';
`;

const Stacked = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.2rem;

	& span:first-child {
		font-weight: 500;
	}

	& span:last-child {
		color: var(--color-grey-500);
		font-size: 1.2rem;
	}
`;

const Amount = styled.div`
	font-family: 'Sono';
	font-weight: 500;
`;

function BookingRow({
	booking: {
		id: bookingId,
		created_at,
		startDate,
		endDate,
		numNights,
		numGuests,
		totalPrice,
		status,
		guests: { fullName: guestName, email },
		cabins: { name: cabinName },
	},
}) {
	const navigate = useNavigate();
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const { makeCheckout, isLoading: isCheckingOut } = useCheckout();
	const { deleteBooking, isLoading: isDeletingBooking } = useDeleteBooking();
	const statusToTagName = {
		unconfirmed: 'blue',
		'checked-in': 'green',
		'checked-out': 'silver',
	};

	return (
		<Table.Row>
			<Cabin>{cabinName}</Cabin>

			<Stacked>
				<span>{guestName}</span>
				<span>{email}</span>
			</Stacked>

			<Stacked>
				<span>
					{isToday(new Date(startDate)) ? 'Today' : formatDistanceFromNow(startDate)} &rarr; {numNights} night stay
				</span>
				<span>
					{format(new Date(startDate), 'MMM dd yyyy')} &mdash; {format(new Date(endDate), 'MMM dd yyyy')}
				</span>
			</Stacked>

			<Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>

			<Amount>{formatCurrency(totalPrice)}</Amount>

			<Menus.Menu>
				<Menus.Toggle id={bookingId}>
					<HiEllipsisVertical />
				</Menus.Toggle>
				<Menus.List id={bookingId}>
					<Menus.Button icon={<HiEye />} onClick={() => navigate('/booking/' + bookingId)}>
						Show details
					</Menus.Button>
					{status === 'unconfirmed' && (
						<Menus.Button icon={<HiArrowDownOnSquare />} onClick={() => navigate('/checkin/' + bookingId)}>
							Check in
						</Menus.Button>
					)}
					{status === 'checked-in' && (
						<Menus.Button icon={<HiArrowUpOnSquare />} disabled={isCheckingOut} onClick={() => makeCheckout(bookingId)}>
							Check out
						</Menus.Button>
					)}
					<Menus.Button icon={<HiTrash />} onClick={() => setShowDeleteModal(true)}>
						Delete Booking
					</Menus.Button>
				</Menus.List>
			</Menus.Menu>
			<Modal bind={[showDeleteModal, setShowDeleteModal]}>
				<ConfirmDelete resourceName="Booking" onConfirm={() => deleteBooking(bookingId)} disabled={isDeletingBooking} />
			</Modal>
		</Table.Row>
	);
}

export default BookingRow;
