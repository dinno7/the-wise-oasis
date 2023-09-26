import { useState } from 'react';
import { HiArrowUpOnSquare, HiTrash } from 'react-icons/hi2';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { useMoveBack } from '../../hooks/useMoveBack';
import Button from '../../ui/Button';
import ButtonGroup from '../../ui/ButtonGroup';
import ButtonText from '../../ui/ButtonText';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Empty from '../../ui/Empty';
import Heading from '../../ui/Heading';
import Modal from '../../ui/Modal';
import Row from '../../ui/Row';
import Spinner from '../../ui/Spinner';
import Tag from '../../ui/Tag';
import useCheckout from '../check-in-out/useCheckout';
import BookingDataBox from './BookingDataBox';
import useBooking from './useBooking';
import useDeleteBooking from './useDeleteBooking';

const HeadingGroup = styled.div`
	display: flex;
	gap: 2.4rem;
	align-items: center;
`;

function BookingDetail() {
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const navigate = useNavigate();
	const { bookingId } = useParams();
	const { data: booking, isLoading } = useBooking(bookingId);
	const moveBack = useMoveBack();
	const { makeCheckout, isLoading: isCheckingOut } = useCheckout();
	const { deleteBooking, isLoading: isDeletingBooking } = useDeleteBooking();

	if (isLoading) return <Spinner />;

	if (!booking) return <Empty resource="Booking" />;

	const { status } = booking;
	const statusToTagName = {
		unconfirmed: 'blue',
		'checked-in': 'green',
		'checked-out': 'silver',
	};

	return (
		<>
			<Row type="horizontal">
				<HeadingGroup>
					<Heading as="h1">Booking #{booking.id}</Heading>
					<Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>
				</HeadingGroup>
				<ButtonText onClick={moveBack}>&larr; Back</ButtonText>
			</Row>

			<BookingDataBox booking={booking} />

			<ButtonGroup>
				<Button
					style={{ marginRight: 'auto' }}
					icon={<HiTrash />}
					variation="danger"
					onClick={() => setShowDeleteModal(true)}>
					Delete Booking
				</Button>
				{status === 'unconfirmed' && <Button onClick={() => navigate('/checkin/' + booking.id)}>Check in</Button>}
				{status === 'checked-in' && (
					<Button icon={<HiArrowUpOnSquare />} disabled={isCheckingOut} onClick={() => makeCheckout(booking.id)}>
						Check out
					</Button>
				)}
				<Button variation="secondary" onClick={moveBack}>
					Back
				</Button>
			</ButtonGroup>

			<Modal bind={[showDeleteModal, setShowDeleteModal]}>
				<ConfirmDelete
					resourceName="Booking"
					onConfirm={() =>
						deleteBooking(bookingId, {
							onSuccess: () => {
								navigate(-1);
							},
						})
					}
					disabled={isDeletingBooking}
				/>
			</Modal>
		</>
	);
}

export default BookingDetail;
