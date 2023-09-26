import { useSearchParams } from 'react-router-dom';

import Select from './Select';

function SortBy({ options }) {
	const [searchParams, setSearchParams] = useSearchParams();

	function handleChanged(e) {
		searchParams.delete('page');

		searchParams.set('sortBy', e.target.value);
		setSearchParams(searchParams);
	}
	return (
		<Select options={options} type="white" onChange={handleChanged} value={searchParams.get('sortBy') || undefined} />
	);
}

export default SortBy;
