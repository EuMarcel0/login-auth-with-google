import { useEffect, useState } from 'react';
import { Box, TextField, TextFieldProps, useTheme, useMediaQuery } from '@mui/material';
import { useField } from '@unform/core';

type TextfieldInputTextProps = TextFieldProps & {
	name: string;
}

export const TextfieldInputText = ({ name, ...rest }: TextfieldInputTextProps) => {
	const { clearError, defaultValue, error, fieldName, registerField } = useField(name);
	const [value, setValue] = useState(defaultValue || '');
	const theme = useTheme();
	const mdDown = useMediaQuery(theme.breakpoints.down('md'));

	useEffect(() => {
		registerField({
			name: fieldName,
			getValue: () => value,
			setValue: (_, newValue: string) => setValue(newValue),
		});
	}, [registerField, value, fieldName]);

	return (
		<Box marginY={theme.spacing(2)} display='flex' justifyContent='center' >
			<TextField
				{...rest}
				error={!!error}
				helperText={error}
				value={value}
				defaultValue={defaultValue}
				onChange={e => { setValue(e.target.value); rest.onChange?.(e); }}
				onKeyDown={e => { error && clearError(); rest.onKeyDown?.(e); }}
				fullWidth
			/>
		</Box>
	);
};
