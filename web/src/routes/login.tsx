import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import { Label } from "#/components/ui/label";
import { Separator } from "#/components/ui/separator";
import logo from "@/assets/images/lieu_logo.png";
import { createFileRoute } from "@tanstack/react-router";
import { Eye, EyeOff } from "lucide-react";
import { type FormEvent, useState } from "react";

export const Route = createFileRoute("/login")({
	component: RouteComponent,
});

function RouteComponent() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		// TODO: wire up auth
		console.log("sign in", { email, password });
	}

	return (
		<div className="flex min-h-screen">
			{/* Left panel — hero image */}
			<div
				className="hidden lg:flex lg:w-[55%] relative flex-col justify-end p-10"
				style={{
					backgroundImage:
						"url(https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1400&q=80)",
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
			>
				<div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/25 to-transparent" />

				<div className="relative z-10">
					<div className="mb-4 flex items-center gap-2">
						<img src={logo} alt="Lieu" className="size-7" />
						<span className="font-serif text-lg font-bold text-white">
							Lieu
						</span>
					</div>
					<blockquote className="font-serif italic text-2xl leading-snug text-white max-w-xs">
						"The real voyage of discovery consists not in seeking
						new landscapes, but in having new eyes."
					</blockquote>
					<p className="mt-3 text-sm text-white/65">
						— Marcel Proust
					</p>
				</div>
			</div>

			{/* Right panel — form */}
			<div className="flex flex-1 flex-col bg-background px-8 py-10 sm:px-14">
				<div className="flex flex-1 flex-col justify-center max-w-sm mx-auto w-full">
					<h1 className="font-serif text-3xl font-bold text-(--ink) mb-2">
						Welcome back, explorer
					</h1>
					<p className="text-sm text-muted-foreground mb-8">
						Log in to save your favorite gems and share new ones.
					</p>

					<form
						onSubmit={handleSubmit}
						className="flex flex-col gap-4"
					>
						{/* Email */}
						<div className="flex flex-col gap-1.5">
							<Label htmlFor="email">Email address</Label>
							<Input
								id="email"
								type="email"
								placeholder="you@example.com"
								autoComplete="email"
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="h-11 rounded-xl"
							/>
						</div>

						{/* Password */}
						<div className="flex flex-col gap-1.5">
							<div className="flex items-center justify-between">
								<Label htmlFor="password">Password</Label>
								<a
									href="#"
									className="text-sm text-(--accent) hover:underline"
								>
									Forgot password?
								</a>
							</div>
							<div className="relative">
								<Input
									id="password"
									type={showPassword ? "text" : "password"}
									placeholder="••••••••••"
									autoComplete="current-password"
									required
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
									className="h-11 rounded-xl pr-11"
								/>
								<Button
									type="button"
									variant="ghost"
									size="icon"
									onClick={() => setShowPassword((v) => !v)}
									aria-label={
										showPassword
											? "Hide password"
											: "Show password"
									}
									className="absolute right-1 top-1/2 -translate-y-1/2 text-muted-foreground"
								>
									{showPassword ? (
										<Eye className="size-4" />
									) : (
										<EyeOff className="size-4" />
									)}
								</Button>
							</div>
						</div>

						<Button
							type="submit"
							size="lg"
							className="mt-2 w-full rounded-full h-11"
						>
							Sign In
						</Button>
					</form>

					{/* Divider */}
					<div className="my-6 flex items-center gap-3">
						<Separator />
						<span className="text-xs text-muted-foreground shrink-0">
							Or continue with
						</span>
						<Separator />
					</div>

					{/* Social buttons */}
					<div className="flex gap-3">
						<Button
							type="button"
							variant="outline"
							className="flex-1 rounded-full gap-2"
						>
							<svg
								className="size-4 shrink-0"
								viewBox="0 0 24 24"
							>
								<path
									d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
									fill="#4285F4"
								/>
								<path
									d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
									fill="#34A853"
								/>
								<path
									d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
									fill="#FBBC05"
								/>
								<path
									d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
									fill="#EA4335"
								/>
							</svg>
							Google
						</Button>
						<Button
							type="button"
							variant="outline"
							className="flex-1 rounded-full gap-2"
						>
							<svg
								className="size-4 shrink-0"
								viewBox="0 0 24 24"
								fill="currentColor"
							>
								<path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
							</svg>
							Apple
						</Button>
					</div>

					<p className="mt-6 text-center text-sm text-muted-foreground">
						Don't have an account?{" "}
						<a
							href="#"
							className="font-semibold text-(--accent) hover:underline"
						>
							Signup
						</a>
					</p>
				</div>

				<footer className="mt-8 text-center text-[0.68rem] font-medium uppercase tracking-widest text-muted-foreground">
					<a href="#" className="hover:underline">
						Privacy
					</a>
					<span className="mx-2">·</span>
					<a href="#" className="hover:underline">
						Terms
					</a>
					<span className="mx-2">·</span>
					<a href="#" className="hover:underline">
						Help
					</a>
				</footer>
			</div>
		</div>
	);
}
