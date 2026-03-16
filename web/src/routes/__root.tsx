import { TanStackDevtools } from "@tanstack/react-devtools";
import {
	Outlet,
	createRootRouteWithContext,
	useLocation,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

import Footer from "#/components/Footer";
import Header from "#/components/Header";
import "../styles.css";

interface MyRouterContext {}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	component: RootComponent,
});

function RootComponent() {
	const location = useLocation();
	const isHome = location.pathname === "/";

	return (
		<>
			{isHome && <Header fullBleed />}
			<Outlet />
			{isHome && <Footer />}
			<TanStackDevtools
				config={{
					position: "bottom-right",
				}}
				plugins={[
					{
						name: "TanStack Router",
						render: <TanStackRouterDevtoolsPanel />,
					},
				]}
			/>
		</>
	);
}
