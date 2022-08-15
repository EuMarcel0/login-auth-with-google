import { Login } from './pages/Login/Login';
import { AuthProvider } from './shared';

export const App = () => {
	return (
		<AuthProvider>
			<Login />
		</AuthProvider>

	);
};
