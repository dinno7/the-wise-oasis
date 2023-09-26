import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import BookingDataBox from '../../features/bookings/BookingDataBox';
import { useMoveBack } from '../../hooks/useMoveBack';
import Button from '../../ui/Button';
import ButtonGroup from '../../ui/ButtonGroup';
import ButtonText from '../../ui/ButtonText';
import Checkbox from '../../ui/Checkbox';
import Heading from '../../ui/Heading';
import Row from '../../ui/Row';
import Spinner from '../../ui/Spinner';
import SpinnerMini from '../../ui/SpinnerMini';
import { formatCurrency } from '../../utils/helpers';
import useBooking from '../bookings/useBooking';
import useSettings from '../settings/useSettings';
import useCheckin from './useCheckin';

const Box = styled.div`
	/* Box */
	background-color: var(--color-grey-0);
	border: 1px solid var(--color-grey-100);
	border-radius: var(--border-radius-md);
	padding: 2.4rem 4rem;
`;

function CheckinBooking() {
	const { bookingId: paramsBookingId } = useParams();
	const { data: booking, isLoading: isLoadBooking } = useBooking(paramsBookingId);
	const [confirmPaid, setConfirmPaid] = useState(false);
	const [addBreakfast, setAddBreakfast] = useState(false);
	const { makeCheckin, isLoading: isCheckingIn } = useCheckin();
	const { settings, isLoading: isLoadSettings } = useSettings();
	const moveBack = useMoveBack();

	const isLoading = isLoadBooking || isLoadSettings;

	useEffect(() => {
		if (!isLoading && booking?.isPaid) {
			setConfirmPaid(true);
		}
	}, [booking?.isPaid, isLoading]);

	if (isLoading) return <Spinner />;

	const { id: bookingId, guests, totalPrice, numGuests, hasBreakfast, numNights, isPaid, status } = booking;
	const breakfastPrice = numGuests * numNights * settings.breakfastPrice;

	if (status !== 'unconfirmed') {
		toast.error('Invalid action');
		return (
			<Box
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}>
				<h2>You can not check in confirmed booking!</h2>
				<ButtonText onClick={moveBack}>&larr; Back</ButtonText>
			</Box>
		);
	}

	function handleCheckin() {
		if (addBreakfast) {
			makeCheckin({
				id: bookingId,
				breakfast: {
					hasBreakfast: true,
					extrasPrice: breakfastPrice,
					totalPrice: totalPrice + breakfastPrice,
				},
			});
		} else makeCheckin({ id: bookingId, breakfast: {} });
	}

	return (
		<>
			<Row type="horizontal">
				<Heading as="h1">Check in booking #{bookingId}</Heading>
				<ButtonText onClick={moveBack}>&larr; Back</ButtonText>
			</Row>

			<BookingDataBox booking={booking} />

			{!hasBreakfast && (
				<Box>
					<Checkbox
						checked={addBreakfast}
						id="addBreakfast"
						onChange={() => {
							setAddBreakfast((add) => !add);
							setConfirmPaid(false);
						}}>
						<span>
							Want to add breakfast for <b>{formatCurrency(breakfastPrice)}</b>?
						</span>
					</Checkbox>
				</Box>
			)}

			<Box>
				<Checkbox
					checked={confirmPaid}
					id="confirmPaid"
					disabled={confirmPaid && isPaid}
					onChange={() => setConfirmPaid((c) => !c)}>
					I confirm that <b>{guests.fullName}</b> has paid the total amount of{' '}
					{addBreakfast ? (
						<span>
							<b>{formatCurrency(totalPrice + breakfastPrice)}</b>({formatCurrency(totalPrice)} +{' '}
							{formatCurrency(breakfastPrice)})
						</span>
					) : (
						<b>{formatCurrency(totalPrice)}</b>
					)}
				</Checkbox>
			</Box>

			<ButtonGroup>
				<Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>
					{isCheckingIn ? <SpinnerMini /> : <span>Check in booking #{bookingId}</span>}
				</Button>
				<Button variation="secondary" onClick={moveBack}>
					Back
				</Button>
			</ButtonGroup>
		</>
	);
}

export default CheckinBooking;
