import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_unAuthenticated")({
	component: UnAuthenticatedRootComponent,
	beforeLoad: async ({ context }) => {
		if (context.auth.isLoading) {
			return;
		}

		if (context.auth.session) {
			throw redirect({ to: "/onboarding" });
		}
	},
});

function UnAuthenticatedRootComponent() {
	return (
		<>
			<Outlet />
		</>
	);
}
