import { useState } from 'react';

import { Box, Button, useTheme, useMediaQuery, Divider, Typography, IconButton } from '@mui/material';
import { GoogleAuthProvider, signInWithPopup, User } from 'firebase/auth';
import { Form } from '@unform/web';

import { Header, TextfieldInputText } from '../../shared';
import IconGoogle from '../../assets/images/google.png';
import { auth } from '../../shared/services/Firebase';

export const Login = () => {
	const theme = useTheme();
	const smDown = useMediaQuery(theme.breakpoints.down('sm'));
	const mdDown = useMediaQuery(theme.breakpoints.down('md'));
	const [user, setUser] = useState<User>({} as User);
	const [showForm, setShowForm] = useState(true);

	const handleSignInGoogle = () => {
		const provider = new GoogleAuthProvider();
		signInWithPopup(auth, provider)
			.then((response) => {
				console.log(response.user);
				setUser(response.user);
				setShowForm(false);
			}).catch((error) => {
				console.log(error);
			});
	};

	return (
		<Box
			width='100vw'
			height='100vh'
			display='flex'
			justifyContent='center'
			alignContent='center'
			flexDirection='column'
		>
			<Box
				width={mdDown ? '80%' : smDown ? '100%' : '40%'}
				marginX='auto'
				border='1px solid #ccc'
				paddingY={mdDown ? theme.spacing(1) : theme.spacing(2)}
				paddingX={mdDown ? theme.spacing(1) : theme.spacing(2)}
			>
				<Header />
				<Form onSubmit={console.log}>
					<TextfieldInputText name='email' label='Email' />
					<TextfieldInputText name='password' type='password' label='Senha' />
				</Form>
				<Button variant='contained' fullWidth >Entrar</Button>
			</Box>
			<Divider orientation='horizontal' sx={{ mt: '2rem', width: mdDown ? '70%' : '30%', height: '14px', mx: 'auto' }}>
				<Typography sx={{ color: '#777' }}>or</Typography>
			</Divider>
			<IconButton onClick={handleSignInGoogle} sx={{ width: '50px', mx: 'auto', mt: '30px' }}>
				<img src={IconGoogle} style={{ width: '100%' }} />
			</IconButton>
		</Box>
	);
};
