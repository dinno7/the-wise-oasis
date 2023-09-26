import { useState } from 'react';

import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import CreateCabinForm from './CreateCabinForm';

// function AddCabin() {
// 	const [showCreateCabinForm, setShowCreateCabinForm] = useState(false);
// 	const closeModal = () => setShowCreateCabinForm(false);
// 	return (
// 		<div>
// 			<Button type="primary" onClick={() => setShowCreateCabinForm((s) => !s)}>
// 				Add cabin
// 			</Button>

// 			{showCreateCabinForm && (
// 				<Modal onClose={closeModal}>
// 					<CreateCabinForm onCloseModal={closeModal} />
// 				</Modal>
// 			)}
// 		</div>
// 	);
// }

function AddCabin() {
	const [showCreateCabinForm, setShowCreateCabinForm] = useState(false);
	const closeModal = () => setShowCreateCabinForm(false);
	return (
		<>
			<Button onClick={() => setShowCreateCabinForm(true)}>Add new cabin</Button>
			<Modal bind={[showCreateCabinForm, setShowCreateCabinForm]}>
				<CreateCabinForm onCloseModal={closeModal} />
			</Modal>
		</>
	);
}

export default AddCabin;
