import { createContext, useContext, useState } from 'react';
import { GoogleAuthProvider, signInWithPopup, User } from 'firebase/auth';
import { auth } from '../../shared/services/Firebase';

interface IAuthContextProps {
	login: () => void;
	user: User;
	isAuthenticated: boolean;
}
interface IAuthProviderProps {
	children: React.ReactNode;
}
export const AuthContext = createContext({} as IAuthContextProps);

export const AuthProvider = ({ children }: IAuthProviderProps) => {
	const [user, setUser] = useState<User>({} as User);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const handleLogin = () => {
		const provider = new GoogleAuthProvider();
		signInWithPopup(auth, provider)
			.then((response) => {
				setUser(response.user);
				setIsAuthenticated(true);
			}).catch((error) => {
				alert(error.message);
			});
	};
	return (
		<AuthContext.Provider value={{ login: handleLogin, user, isAuthenticated }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuthProvider = () => useContext(AuthContext);
