// src/auth.tsx
import { supabase } from "@/lib/supabase";
// import { useUserStore } from "@/stores/userStore";
// import type { User } from "@/types/user";
import type { Session, User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";

export interface AuthContextType {
	user: User | null;
	session: Session | null;
	isLoading: boolean;
	signIn: (email: string, password: string) => Promise<void>;
	signOut: () => Promise<void>;
	oAuthSignIn: (provider: string) => Promise<void>;
	setAccount: (password: string) => Promise<void>;
}

// 1. Keep the context name distinct from the type name
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	// const { fetchLoggedUser } = useUserStore();
	const [user, setUser] = useState<User | null>(null);
	const [session, setSession] = useState<Session | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	// const refreshUser = async () => {
	// 	try {
	// 		const loggedUser = await fetchLoggedUser();
	// 		setUser(loggedUser as User | null);
	// 	} catch (error) {
	// 		setUser(null);
	// 		console.error("Refresh User Error:", error);
	// 	}
	// };
	const oAuthSignIn = async (provider: string) => {
		setIsLoading(true);
		const { error } = await supabase.auth.signInWithOAuth({
			provider: provider as any,
		});
		if (error) {
			console.error("Error signing in with OAuth:", error);
		} else {
			// console.log("OAuth sign-in successful", data);
		}
		setIsLoading(false);
	};

	const setAccount = async (password: string) => {
		try {
			setIsLoading(true);
			const { error } = await supabase.auth.updateUser({
				password,
				data: {
					done_setup: true,
				},
			});
		} catch (error) {
			console.error("Error setting initial password:", error);
			throw error;
		} finally {
			setIsLoading(false);
		}
	};

	const signIn = async (email: string, password: string) => {
		setIsLoading(true);
		const { error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});
		if (error) {
			console.error("Error signing in:", error);
		} else {
			console.log("Sign-in successful");
		}
		setIsLoading(false);
	};

	const signOut = async () => {
		setIsLoading(true);
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.error("Error signing out:", error.message);
		} else {
			console.log("Sign-out successful");
		}
		setIsLoading(false);
	};

	useEffect(() => {
		const initAuth = async () => {
			try {
				const {
					data: { session },
				} = await supabase.auth.getSession();
				setSession(session);

				if (session) {
					setUser(session.user);
				}
			} finally {
				setIsLoading(false);
			}
		};

		initAuth();

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
			setUser(session?.user ?? null); // Sync user state with session
			setIsLoading(false);
		});

		return () => subscription.unsubscribe();
	}, []);

	// 2. Use AuthContext.Provider directly.
	// Do NOT destructure "Provider" into a separate constant.
	return (
		<AuthContext.Provider
			value={{
				user,
				session,
				isLoading,
				signIn,
				signOut,
				oAuthSignIn,
				setAccount,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
