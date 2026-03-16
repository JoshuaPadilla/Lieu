import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";

import { Button } from "#/components/ui/button";
import logo from "@/assets/images/lieu_logo.png";
import ThemeToggle from "./ThemeToggle";

type HeaderProps = {
	fullBleed?: boolean;
};

export default function Header({ fullBleed = false }: HeaderProps) {
	const navigate = useNavigate();
	const location = useLocation();
	const isLogin = location.pathname === "/login";

	return (
		<header className="relative z-20">
			<nav
				className={`${fullBleed ? "w-full border-b-0" : "page-wrap"} ${isLogin ? "bg-(--bg)" : ""} flex items-center justify-between border border-(--line) border-x-0 border-t-0 bg-(--surface) px-6 py-4 sm:px-10 lg:px-14`}
			>
				<Link
					to="/"
					className="inline-flex items-center gap-2 text-(--ink) no-underline"
				>
					<img src={logo} alt="Lieu" className="size-12" />
					<span className="landing-display text-[1.95rem] leading-none font-bold tracking-tight">
						Lieu
					</span>
				</Link>

				<div className="hidden items-center gap-10 text-[0.86rem] font-semibold uppercase tracking-[0.11em] text-(--ink-soft) lg:flex">
					<Link
						to="/"
						className="nav-link"
						activeProps={{ className: "nav-link is-active" }}
					>
						Explore
					</Link>
					<a href="#" className="nav-link">
						Submit A Gem
					</a>
					<a
						href="#"
						className="nav-link inline-flex items-center gap-0.5"
					>
						Cities
						<ChevronDown className="h-3 w-3" />
					</a>
				</div>

				<div className="flex items-center gap-3">
					<ThemeToggle />
					<Button
						variant="ghost"
						size="sm"
						className="hidden rounded-full px-4 text-(--ink) sm:inline-flex"
						onClick={() => navigate({ to: "/login" })}
					>
						Sign In
					</Button>
					<Button variant="accent" size="sm" className="rounded-sm">
						Add a Gem
					</Button>
				</div>
			</nav>
		</header>
	);
}
