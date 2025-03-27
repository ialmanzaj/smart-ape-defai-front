import React from "react";

interface DateDropDownProps {
	onChange: (value: string) => void;
	days: string;
}

const DateDropDown: React.FC<DateDropDownProps> = ({ onChange, days }) => {
	const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value;
		// Invoke the passed-in onChange callback.
		if (onChange) {
			onChange(value);
		}
	};

	return (
		<div>
			<select value={days} onChange={handleDropdownChange}>
				<option key="7" value="7">
					7 days
				</option>
				<option key="30" value="30">
					30 days
				</option>
				<option key="60" value="60">
					60 days
				</option>
				<option key="90" value="90">
					90 days
				</option>
				<option key="365" value="365">
					1 year
				</option>
			</select>
		</div>
	);
};

export default DateDropDown;
