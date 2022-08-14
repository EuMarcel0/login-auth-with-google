import { useField } from '@unform/core';
import { Input, InputProps } from 'antd';
import { useEffect, useState } from 'react';


interface IAntdInputProps extends InputProps {
	name: string;
}

export const AntdInput = ({ name, ...rest }: IAntdInputProps) => {
	const { clearError, defaultValue, error, fieldName, registerField } = useField(name);
	const [value, setValue] = useState(defaultValue || '');

	useEffect(() => {
		registerField({
			name: fieldName,
			getValue: () => value,
			setValue: (_, newValue: string) => setValue(newValue),
		});
	}, [registerField, value, fieldName]);

	return (
		<Input
			{...rest}
			type='email'
			size='middle'
		/>
	);
};
