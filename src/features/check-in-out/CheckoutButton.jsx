import Button from '../../ui/Button';
import useCheckout from './useCheckout';

function CheckoutButton({ bookingId }) {
	const { makeCheckout, isLoading } = useCheckout();
	return (
		<Button variation="secondary" size="small" disabled={isLoading} onClick={() => makeCheckout(bookingId)}>
			Check out
		</Button>
	);
}

export default CheckoutButton;
