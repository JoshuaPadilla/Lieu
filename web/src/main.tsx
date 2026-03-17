import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { StrictMode, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider, useAuth } from "./context/auth_context";
import { routeTree } from "./routeTree.gen";

const router = createRouter({
	routeTree,
	defaultPreload: "intent",
	scrollRestoration: true,
	context: {
		auth: undefined!,
	},
});

const queryClient = new QueryClient();

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

const App = () => {
	const auth = useAuth();

	useEffect(() => {
		// Re-run route guards/loaders when auth state updates.
		router.invalidate();
	}, [auth.session, auth.isLoading]);

	return <RouterProvider router={router} context={{ auth }} />;
};

const rootElement = document.getElementById("app")!;

if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<StrictMode>
			<QueryClientProvider client={queryClient}>
				<AuthProvider>
					<App />
				</AuthProvider>
			</QueryClientProvider>
		</StrictMode>,
	);
}
