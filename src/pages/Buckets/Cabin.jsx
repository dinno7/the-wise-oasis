import toast from 'react-hot-toast';
import { HiOutlineBackward, HiOutlineChevronLeft, HiOutlineTrash } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { deleteStorageImage, getStorageImages } from '../../services/apiGlobal';
import Button from '../../ui/Button';
import Skeleton from '../../ui/Skeleton';
import WrapperGrid from '../../ui/WrapperGrid';

const Figure = styled.figure`
	width: 100%;
	aspect-ratio: 1/1;
	border-radius: 10px;
	overflow: hidden;
	position: relative;
	cursor: pointer;

	& .delete-icon {
		font-size: 4rem;
		background-color: rgba(255, 46, 46, 0.7);
		display: flex;
		padding: 0.5rem;
		border-radius: 7px;
		color: #ffe8e8;
		position: absolute;
		left: 50%;
		top: 35%;
		transform: translateX(-50%) translateY(-50%);
		pointer-events: none;
		opacity: 0;
		transition: all 0.5s ease;
	}
	&:hover {
		& .delete-icon {
			opacity: 1;
			top: 50%;
		}
	}
`;
const Img = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
	object-position: center;
	-webkit-transition: all 0.5s ease;
	transition: all 0.5s ease;

	&:hover {
		-webkit-filter: grayscale(0.7) blur(2px);
		filter: grayscale(0.7) blur(2px);

		transform: scale(1.1);
	}
`;

function BucketCabin() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const {
		data: imageUrls,
		error,
		isLoading,
	} = useQuery({
		queryKey: ['cabin-images'],
		queryFn: () => getStorageImages('cabin-images'),
	});

	const { mutate: deleteImg, isDeleting } = useMutation({
		mutationFn: (image) => deleteStorageImage('cabin-images', [image]),
		onSuccess: () => {
			queryClient.invalidateQueries(['cabin-images']);
			toast.success('Deleted successfully');
		},
		onError: (err) => toast.error(err.message || 'There is some problem to delete image from bucket'),
	});

	if (isLoading)
		return (
			<WrapperGrid>
				{Array.from(Array(12), (_, i) => (
					<Skeleton key={i} />
				))}
			</WrapperGrid>
		);

	return (
		<>
			<Button
				size="small"
				variation="secondary"
				style={{ maxWidth: 'max-content' }}
				onClick={() => navigate('/buckets')}>
				<HiOutlineChevronLeft size={24} />
			</Button>
			<WrapperGrid>
				{imageUrls.map((image) => (
					<Figure key={image} onClick={() => deleteImg(image.split('/').at(-1))}>
						<Img src={image} alt="Cabin images" />
						<span className="delete-icon">
							<HiOutlineTrash />
						</span>
					</Figure>
				))}
			</WrapperGrid>
		</>
	);
}

export default BucketCabin;
