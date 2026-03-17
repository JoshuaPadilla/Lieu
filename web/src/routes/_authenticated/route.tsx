import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
	component: AuthLayout,
	beforeLoad: async ({ context }) => {
		if (context.auth.isLoading) {
			return;
		}

		if (!context.auth.session) {
			throw redirect({ to: "/login" });
		}
	},
});

function AuthLayout() {
	return <Outlet />;
}
