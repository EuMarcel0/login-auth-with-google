import { useRef, useState } from 'react';

import { Box, Button, useTheme, useMediaQuery, Divider, Typography, IconButton, Checkbox } from '@mui/material';
import { Form } from '@unform/web';
import * as yup from 'yup';

import { Header, TextfieldInputText, useAuthProvider } from '../../shared';
import IconGoogle from '../../assets/images/google.png';
import WaveBg from '../../assets/images/wave.svg';
import { Profile } from '../Profile/Profile';
import { FormHandles } from '@unform/core';

interface IUnformValidationYupSchema {
	email: string;
	password: string;
}

const yupValidationSchema: yup.SchemaOf<IUnformValidationYupSchema> = yup.object().shape({
	email: yup.string().email().required(),
	password: yup.string().required()
});

export const Login = () => {
	const theme = useTheme();
	const smDown = useMediaQuery(theme.breakpoints.down('sm'));
	const mdDown = useMediaQuery(theme.breakpoints.down('md'));
	const { login, isAuthenticated } = useAuthProvider();
	const unformRef = useRef<FormHandles>(null);
	const [showPassword, setShowPassword] = useState(false);

	const handleLoginSubmit = (data: IUnformValidationYupSchema) => {
		yupValidationSchema.validate(data, { abortEarly: false })
			.then((validateData) => {
				login();
			}).catch((errors: yup.ValidationError) => {
				const validationError: { [key: string]: string } = {};
				errors.inner.forEach((error) => {
					if (error.path) {
						validationError[error.path] = error.message;
					}
					unformRef.current?.setErrors(validationError);
				});
			});
	};

	return (
		<Box>
			{(!isAuthenticated &&
				<Box
					width='100vw'
					height='100vh'
					display='flex'
					justifyContent='center'
					alignContent='center'
					flexDirection='column'
					position='relative'
				>
					<Box sx={{ position: 'absolute', top: '0', left: '0', right: '0' }}>
						<img src={WaveBg} />
					</Box>
					<Box
						width={mdDown ? '80%' : smDown ? '100%' : '40%'}
						marginX='auto'
						border='1px solid #ccc'
						paddingY={mdDown ? theme.spacing(1) : theme.spacing(2)}
						paddingX={mdDown ? theme.spacing(1) : theme.spacing(2)}
					>
						<Header />
						<Form ref={unformRef} onSubmit={handleLoginSubmit}>
							<TextfieldInputText name='email' label='Email' />
							<TextfieldInputText name='password' type={showPassword ? 'text' : 'password'} label='Senha' />
						</Form>
						<Box display='flex' alignItems='center' marginBottom={2}>
							<Checkbox onClick={() => setShowPassword(!showPassword)} />
							<Typography variant='body2'>Mostrar senha</Typography>
						</Box>
						<Button variant='contained' fullWidth sx={{ textTransform: 'capitalize' }} onClick={() => unformRef.current?.submitForm()}>Entrar</Button>
					</Box>
					<Divider orientation='horizontal' sx={{ mt: '2rem', width: mdDown ? '70%' : '30%', height: '14px', mx: 'auto' }}>
						<Typography sx={{ color: '#777' }}>or</Typography>
					</Divider>
					<IconButton onClick={login} sx={{ width: '50px', mx: 'auto', mt: '30px' }}>
						<img src={IconGoogle} style={{ width: '100%' }} />
					</IconButton>
				</Box>
			)}
			{(isAuthenticated && <Profile />)}
		</Box>
	);
};
