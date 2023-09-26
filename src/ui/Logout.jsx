import { HiArrowRightOnRectangle } from 'react-icons/hi2';

import useLogout from '../features/authentication/useLogout';
import ButtonIcon from './ButtonIcon';
import SpinnerMini from './SpinnerMini';

function Logout() {
	const { logout, isLoading } = useLogout();
	return (
		<ButtonIcon onClick={logout} disabled={isLoading}>
			{isLoading ? <SpinnerMini /> : <HiArrowRightOnRectangle />}
		</ButtonIcon>
	);
}

export default Logout;
