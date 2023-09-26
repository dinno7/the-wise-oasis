import { Navigate, Route, Routes } from 'react-router-dom';

import DefaultLayout from './layouts/DefaultLayout';
import Protect from './layouts/Protect';
import Account from './pages/Account';
import Booking from './pages/Booking';
import Bookings from './pages/Bookings';
import Buckets from './pages/Buckets';
import BucketCabin from './pages/Buckets/Cabin';
import Cabins from './pages/Cabins';
import Checkin from './pages/Checkin';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import Settings from './pages/Settings';
import Users from './pages/Users';

function App() {
	return (
		<Routes>
			<Route index element={<Navigate replace to="/dashboard" />} />
			<Route
				element={
					<Protect>
						<DefaultLayout />
					</Protect>
				}>
				<Route path="/dashboard" element={<Dashboard />} index />
				<Route path="/bookings" element={<Bookings />} />
				<Route path="/booking/:bookingId" element={<Booking />} />
				<Route path="/checkin/:bookingId" element={<Checkin />} />
				<Route path="/cabins" element={<Cabins />} />
				<Route path="/users" element={<Users />} />
				<Route path="/settings" element={<Settings />} />
				<Route path="/account" element={<Account />} />
				<Route path="/buckets">
					<Route element={<Buckets />} index />
					<Route path="cabin" element={<BucketCabin />} />
				</Route>
				<Route path="*" element={<PageNotFound />} />
			</Route>
			<Route path="/login" element={<Login />} />
		</Routes>
	);
}

export default App;
