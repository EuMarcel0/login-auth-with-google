import { Form } from '@unform/web';
import { Box } from '@mui/material';
import { Header, TextfieldInputText } from '../../shared';

export const Login = () => {
	return (
		<Box
			width='100vw'
			height='100vh'
			display='flex'
			justifyContent='center'
			alignContent='center'
			flexDirection='column'
		>
			<Box width='30%' marginX='auto' border='1px solid #ccc' paddingY={3}>
				<Header />
				<Form onSubmit={console.log}>
					<TextfieldInputText name='email' label='Email' />
					<TextfieldInputText name='password' type='password' label='Senha' />
				</Form>
			</Box>
		</Box>
	);
};
