import { useState } from 'react';
import { HiEllipsisVertical, HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';
import styled from 'styled-components';

import Button from '../../ui/Button';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Menus from '../../ui/Menus';
import Modal from '../../ui/Modal';
import Table from '../../ui/Table';
import { formatCurrency } from '../../utils/helpers.js';
import CreateCabinForm from './CreateCabinForm';
import useCreateCabin from './useCreateCabin';
import useDeleteCabin from './useDeleteCabin';

const Img = styled.img`
	display: block;
	width: 6.4rem;
	aspect-ratio: 3 / 2;
	object-fit: cover;
	object-position: center;
	transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
	font-size: 1.6rem;
	font-weight: 600;
	color: var(--color-grey-600);
	font-family: 'Sono';
`;

const Price = styled.div`
	font-family: 'Sono';
	font-weight: 600;
`;

const Discount = styled.div`
	font-family: 'Sono';
	font-weight: 500;
	color: var(--color-green-700);
`;

const ActionBtns = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	gap: 1rem;
`;

function CabinRow({ cabin }) {
	const [showEditForm, setShowEditForm] = useState(false);
	const { deleteCabin, isDeleting } = useDeleteCabin();
	const { createCabin, isCreating } = useCreateCabin();

	const [showDeleteDialog, setShowDeleteDialog] = useState(false);

	const isWorking = isDeleting || isCreating;

	const { id: cabinId, image, name, discount, regularPrice, maxCapacity, description } = cabin;

	function handleDuplicateCabin() {
		const newCabin = {
			image,
			name: 'Copy of ' + name,
			discount,
			regularPrice,
			maxCapacity,
			description,
		};

		createCabin(newCabin);
	}
	return (
		<>
			<Table.Row>
				<Img src={image} alt={name} width="100" />
				<Cabin>{name}</Cabin>
				<div>Fix up to {maxCapacity} guests</div>
				<Price>{formatCurrency(regularPrice)}</Price>
				{discount ? <Discount>{formatCurrency(discount)}</Discount> : <span>&mdash;</span>}

				<Menus.Menu>
					<Menus.Toggle id={cabinId} />

					<Menus.List id={cabinId}>
						<Menus.Button icon={<HiSquare2Stack />} disabled={isWorking} onClick={handleDuplicateCabin}>
							Duplicate
						</Menus.Button>
						<Menus.Button icon={<HiPencil />} disabled={isWorking} onClick={() => setShowEditForm((s) => !s)}>
							Edit
						</Menus.Button>
						<Menus.Button
							icon={<HiTrash />}
							onClick={() => setShowDeleteDialog(!showDeleteDialog)}
							disabled={isWorking}>
							Delete
						</Menus.Button>
					</Menus.List>
				</Menus.Menu>
				{/* <ActionBtns>
					<Button variation="primary" size="small" disabled={isWorking} onClick={handleDuplicateCabin}>
						<HiSquare2Stack size={16} />
					</Button>
					<Button variation="primary" size="small" disabled={isWorking} onClick={() => setShowEditForm((s) => !s)}>
						<HiPencil size={16} />
					</Button>
					<Button
						variation="danger"
						size="small"
						onClick={() => setShowDeleteDialog(!showDeleteDialog)}
						disabled={isWorking}>
						<HiTrash size={16} />
					</Button>
				</ActionBtns> */}
			</Table.Row>
			<Modal bind={[showEditForm, setShowEditForm]}>
				<CreateCabinForm onCloseModal={setShowEditForm} initialValues={cabin} />
			</Modal>
			<Modal bind={[showDeleteDialog, setShowDeleteDialog]}>
				<ConfirmDelete resourceName="Cabin" disabled={isWorking} onConfirm={() => deleteCabin(cabinId)} />
			</Modal>
		</>
	);
}

export default CabinRow;
