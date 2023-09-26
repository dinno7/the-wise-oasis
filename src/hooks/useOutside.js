import { useEffect, useRef } from 'react';

export default function useOutside(callback, capture = true) {
	const ref = useRef(null);
	useEffect(() => {
		function handleFn(e) {
			if (ref.current && !ref.current.contains(e.target)) {
				return callback(e);
			}
		}
		document.addEventListener('click', handleFn, capture);

		return document.addEventListener('click', handleFn, capture);
	}, [callback]);

	return ref;
}
