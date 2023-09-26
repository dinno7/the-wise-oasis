import { createPortal } from 'react-dom';

function Teleport({ children, to = 'body' }) {
	const container = document.querySelector(to);
	return createPortal(children, container);
}

export default Teleport;
