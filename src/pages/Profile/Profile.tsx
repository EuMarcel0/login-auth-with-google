import { Box, Button, Typography } from '@mui/material';
import { useAuthProvider } from '../../shared';

export const Profile = () => {
	const { user } = useAuthProvider();

	return (
		<Box
			display='flex'
			justifyContent='center'
			alignItems='center'
			flexDirection='column'
			height='100vh'
			bgcolor='#f7f7f7'
		>
			<Typography variant='h2'>Você está logado</Typography>
			<Box
				display='flex'
				justifyContent='center'
				flexDirection='column'
				marginY='2rem'
				gap={1}
			>
				{(user.photoURL && <img src={user.photoURL} alt='Foto do perfil' style={{ margin: '0 auto', borderRadius: '50%' }} />)}
				<Typography align='center' variant='caption'>{user.displayName}</Typography>
				<Typography align='center' variant='body2' fontWeight='bold'>{user.email}</Typography>
			</Box>
			<Button variant='contained' onClick={() => window.location.reload()} sx={{ textTransform: 'capitalize' }}>Voltar</Button>
		</Box>
	);
};
