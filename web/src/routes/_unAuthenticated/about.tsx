import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_unAuthenticated/about")({
	component: About,
});

function About() {
	return <main></main>;
}
