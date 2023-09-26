import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';
import useSettings from './useSettings';
import useUpdateSettings from './useUpdateSettings';

function UpdateSettingsForm() {
	const { settings, isLoading, error } = useSettings();
	const { updateSettings, isUpdating } = useUpdateSettings();

	if (isLoading) return <Spinner />;

	if (error) return <p>There is error</p>;

	const { minBookingLength, maxBookingLength, maxGuestsPerBooking, breakfastPrice } = settings;

	function handleUpdateSettings(e, field) {
		const { value } = e.target;
		if (!value) return;

		if (+value === settings[field]) return;

		updateSettings({ [field]: value });
	}

	return (
		<>
			<p>Just change setting, this is sensitive to blur action</p>
			<Form>
				<FormRow label="Minimum nights/booking">
					<Input
						type="number"
						id="min-nights"
						disabled={isUpdating}
						defaultValue={minBookingLength}
						onBlur={(e) => handleUpdateSettings(e, 'minBookingLength')}
						onKeyDown={(e) => e.key === 'Enter' && handleUpdateSettings(e, 'breakfastPrice')}
					/>
				</FormRow>
				<FormRow label="Maximum nights/booking">
					<Input
						type="number"
						id="max-nights"
						disabled={isUpdating}
						defaultValue={maxBookingLength}
						onBlur={(e) => handleUpdateSettings(e, 'maxBookingLength')}
						onKeyDown={(e) => e.key === 'Enter' && handleUpdateSettings(e, 'maxGuestsPerBooking')}
					/>
				</FormRow>
				<FormRow label="Maximum guests/booking">
					<Input
						type="number"
						id="max-guests"
						disabled={isUpdating}
						defaultValue={maxGuestsPerBooking}
						onBlur={(e) => handleUpdateSettings(e, 'maxGuestsPerBooking')}
						onKeyDown={(e) => e.key === 'Enter' && handleUpdateSettings(e, 'maxBookingLength')}
					/>
				</FormRow>
				<FormRow label="Breakfast price">
					<Input
						type="number"
						id="breakfast-price"
						disabled={isUpdating}
						defaultValue={breakfastPrice}
						onBlur={(e) => handleUpdateSettings(e, 'breakfastPrice')}
						onKeyDown={(e) => e.key === 'Enter' && handleUpdateSettings(e, 'minBookingLength')}
					/>
				</FormRow>
			</Form>
		</>
	);
}

export default UpdateSettingsForm;
