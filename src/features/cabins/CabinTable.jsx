import { useSearchParams } from 'react-router-dom';

import Menus from '../../ui/Menus';
import Pagination from '../../ui/Pagination';
import Spinner from '../../ui/Spinner';
import Table from '../../ui/Table';
import CabinRow from './CabinRow';
import useCabins from './useCabins';

function CabinTable() {
	const { cabins, isLoading } = useCabins();
	const [searchParams] = useSearchParams();

	// >> Filter
	let filteredCabins = cabins || [];
	const discountFilter = searchParams.get('discount');
	if (discountFilter === 'with-discount') filteredCabins = filteredCabins.filter((c) => c.discount > 0);
	if (discountFilter === 'no-discount') filteredCabins = filteredCabins.filter((c) => !c.discount || c.discount <= 0);

	// >> Sort
	const sortQuery = searchParams.get('sortBy') || '';
	const [field, direction] = sortQuery.split('-');
	const modifier = direction === 'asc' ? 1 : -1;
	if (field && direction) {
		filteredCabins = filteredCabins.sort((a, b) => (a[field] - b[field]) * modifier);
	}
	if (isLoading) return <Spinner />;

	return (
		<Menus>
			<Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
				<Table.Head>
					<div style={{ textAlign: 'left' }}>Image</div>
					<div style={{ textAlign: 'left' }}>Cabin</div>
					<div style={{ textAlign: 'left' }}>Capacity</div>
					<div style={{ textAlign: 'left' }}>Price</div>
					<div style={{ textAlign: 'left' }}>Discount</div>
					<div style={{ textAlign: 'left' }}>Actions</div>
				</Table.Head>
				<Table.Body data={filteredCabins} render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />} />
				<Table.Foot>
					<Pagination count={filteredCabins.length} />
				</Table.Foot>
			</Table>
		</Menus>
	);
}

export default CabinTable;
