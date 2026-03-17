import { Button } from "#/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "#/components/ui/card";
import { Input } from "#/components/ui/input";
import { Label } from "#/components/ui/label";
import { useAuth } from "#/context/auth_context";
import { createFileRoute, redirect } from "@tanstack/react-router";
import {
	AtSign,
	Camera,
	Check,
	ChevronLeft,
	ChevronRight,
	Eye,
	EyeOff,
	Lock,
	MapPin,
	PartyPopper,
	Plus,
	User,
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/_authenticated/onboarding/")({
	component: RouteComponent,
	beforeLoad: async ({ context }) => {
		if (context.auth.session?.user.user_metadata.isOnboarded) {
			throw redirect({ to: "/user" });
		}
	},
	loader: ({ context }) => {
		// Source of truth is the session metadata
		const currentStep = context.auth.session?.user.user_metadata.user_name
			? 2
			: 1;
		return { step: currentStep };
	},
});

const STEPS = [
	{ id: 1, label: "Account" },
	{ id: 2, label: "Profile" },
	{ id: 3, label: "Done" },
];

// ─── Password strength ────────────────────────────────────────────────────────
function getPasswordStrength(pw: string): {
	score: number;
	label: string;
	color: string;
} {
	if (!pw) return { score: 0, label: "", color: "" };
	let score = 0;
	if (pw.length >= 8) score++;
	if (pw.length >= 12) score++;
	if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
	if (/[0-9]/.test(pw)) score++;
	if (/[^A-Za-z0-9]/.test(pw)) score++;
	const capped = Math.min(score, 4) as 1 | 2 | 3 | 4;
	const map = {
		1: { label: "Weak", color: "bg-destructive" },
		2: { label: "Fair", color: "bg-orange-400" },
		3: { label: "Good", color: "bg-yellow-400" },
		4: { label: "Strong", color: "bg-green-500" },
	};
	return {
		score: capped,
		...(map[capped] ?? { label: "Weak", color: "bg-destructive" }),
	};
}

// ─── Step Indicator ───────────────────────────────────────────────────────────
function StepIndicator({ current }: { current: number }) {
	return (
		<div className="mb-8">
			<div className="flex items-start justify-between mb-3">
				{STEPS.map((step) => (
					<div
						key={step.id}
						className="flex flex-col items-center gap-2"
					>
						<div
							className={`size-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
								step.id < current
									? "bg-(--accent) text-white shadow-sm shadow-(--accent)/30"
									: step.id === current
										? "bg-background border-2 border-(--accent) text-(--accent) ring-4 ring-(--accent)/15"
										: "bg-background border-2 border-border text-muted-foreground"
							}`}
						>
							{step.id < current ? (
								<Check className="size-4" strokeWidth={3} />
							) : (
								step.id
							)}
						</div>
						<span
							className={`text-xs font-medium transition-colors ${
								step.id === current
									? "text-(--accent)"
									: step.id < current
										? "text-(--ink)"
										: "text-muted-foreground"
							}`}
						>
							{step.label}
						</span>
					</div>
				))}
			</div>
			{/* Progress track */}
			<div className="h-1 rounded-full bg-border overflow-hidden">
				<div
					className="h-full bg-(--accent) rounded-full transition-all duration-500 ease-in-out"
					style={{
						width: `${((current - 1) / (STEPS.length - 1)) * 100}%`,
					}}
				/>
			</div>
		</div>
	);
}

// ─── Step 1: Account Setup ────────────────────────────────────────────────────
function AccountStep({
	onNext,
}: {
	onNext: (userName: string, password: string) => void;
}) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirm, setConfirm] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);
	const [errors, setErrors] = useState<{
		username?: string;
		password?: string;
		confirm?: string;
	}>({});

	const strength = getPasswordStrength(password);

	const validate = () => {
		const next: typeof errors = {};
		if (!username.trim()) next.username = "Username is required.";
		else if (username.trim().length < 3)
			next.username = "Must be at least 3 characters.";
		if (!password) next.password = "Password is required.";
		else if (password.length < 8)
			next.password = "Must be at least 8 characters.";
		if (password !== confirm) next.confirm = "Passwords do not match.";
		return next;
	};

	const handleNext = () => {
		const errs = validate();
		if (Object.keys(errs).length > 0) {
			setErrors(errs);
			return;
		}
		onNext(username, password);
	};

	return (
		<>
			<CardHeader className="pb-4">
				<div className="flex items-center gap-3 mb-1">
					<div className="size-9 rounded-xl bg-(--accent)/10 flex items-center justify-center shrink-0">
						<Lock className="size-4 text-(--accent)" />
					</div>
					<CardTitle className="text-xl">
						Set up your account
					</CardTitle>
				</div>
				<CardDescription className="pl-12">
					Choose a username and a strong password to get started.
				</CardDescription>
			</CardHeader>

			<CardContent className="flex flex-col gap-5">
				{/* Username */}
				<div className="flex flex-col gap-1.5">
					<Label htmlFor="username">Username</Label>
					<div className="relative flex items-center">
						<span className="absolute left-2.5 flex items-center pointer-events-none">
							<AtSign className="size-3.5 text-muted-foreground" />
						</span>
						<Input
							id="username"
							placeholder="johndoe"
							className="pl-8"
							value={username}
							onChange={(e) => {
								setUsername(e.target.value);
								setErrors((p) => ({
									...p,
									username: undefined,
								}));
							}}
							aria-invalid={!!errors.username}
						/>
					</div>
					{errors.username && (
						<p className="text-xs text-destructive flex items-center gap-1.5">
							<span className="size-1.5 rounded-full bg-destructive shrink-0 inline-block" />
							{errors.username}
						</p>
					)}
				</div>

				{/* Password */}
				<div className="flex flex-col gap-1.5">
					<Label htmlFor="password">Password</Label>
					<div className="relative flex items-center">
						<span className="absolute left-2.5 flex items-center pointer-events-none">
							<Lock className="size-3.5 text-muted-foreground" />
						</span>
						<Input
							id="password"
							type={showPassword ? "text" : "password"}
							placeholder="At least 8 characters"
							className="pl-8 pr-9"
							value={password}
							onChange={(e) => {
								setPassword(e.target.value);
								setErrors((p) => ({
									...p,
									password: undefined,
								}));
							}}
							aria-invalid={!!errors.password}
						/>
						<button
							type="button"
							onClick={() => setShowPassword((v) => !v)}
							className="absolute right-2.5 text-muted-foreground hover:text-(--ink) transition-colors"
							tabIndex={-1}
						>
							{showPassword ? (
								<EyeOff className="size-4" />
							) : (
								<Eye className="size-4" />
							)}
						</button>
					</div>
					{/* Strength bar */}
					{password && (
						<div className="flex items-center gap-2 mt-0.5">
							<div className="flex gap-1 flex-1">
								{[1, 2, 3, 4].map((seg) => (
									<div
										key={seg}
										className={`h-1 flex-1 rounded-full transition-all duration-300 ${
											strength.score >= seg
												? strength.color
												: "bg-border"
										}`}
									/>
								))}
							</div>
							<span className="text-xs text-muted-foreground w-12 text-right tabular-nums">
								{strength.label}
							</span>
						</div>
					)}
					{errors.password && (
						<p className="text-xs text-destructive flex items-center gap-1.5">
							<span className="size-1.5 rounded-full bg-destructive shrink-0 inline-block" />
							{errors.password}
						</p>
					)}
				</div>

				{/* Confirm */}
				<div className="flex flex-col gap-1.5">
					<Label htmlFor="confirm">Confirm Password</Label>
					<div className="relative flex items-center">
						<span className="absolute left-2.5 flex items-center pointer-events-none">
							<Lock className="size-3.5 text-muted-foreground" />
						</span>
						<Input
							id="confirm"
							type={showConfirm ? "text" : "password"}
							placeholder="Repeat your password"
							className="pl-8 pr-9"
							value={confirm}
							onChange={(e) => {
								setConfirm(e.target.value);
								setErrors((p) => ({
									...p,
									confirm: undefined,
								}));
							}}
							aria-invalid={!!errors.confirm}
						/>
						<button
							type="button"
							onClick={() => setShowConfirm((v) => !v)}
							className="absolute right-2.5 text-muted-foreground hover:text-(--ink) transition-colors"
							tabIndex={-1}
						>
							{showConfirm ? (
								<EyeOff className="size-4" />
							) : (
								<Eye className="size-4" />
							)}
						</button>
					</div>
					{errors.confirm && (
						<p className="text-xs text-destructive flex items-center gap-1.5">
							<span className="size-1.5 rounded-full bg-destructive shrink-0 inline-block" />
							{errors.confirm}
						</p>
					)}
				</div>
			</CardContent>

			<CardFooter className="justify-between items-center border-t border-border pt-4 mt-2">
				<span className="text-xs text-muted-foreground">
					Step 1 of 4
				</span>
				<Button
					variant="accent"
					onClick={handleNext}
					className="gap-1.5"
				>
					Continue <ChevronRight className="size-4" />
				</Button>
			</CardFooter>
		</>
	);
}

// ─── Step 2: Profile Info (placeholder) ──────────────────────────────────────
function ProfileStep({
	onBack,
	onNext,
}: {
	onBack: () => void;
	onNext: () => void;
}) {
	return (
		<>
			<CardHeader className="pb-4">
				<div className="flex items-center gap-3 mb-1">
					<div className="size-9 rounded-xl bg-(--accent)/10 flex items-center justify-center shrink-0">
						<User className="size-4 text-(--accent)" />
					</div>
					<CardTitle className="text-xl">
						Build your profile
					</CardTitle>
				</div>
				<CardDescription className="pl-12">
					Let others know who you are on Lieu.
				</CardDescription>
			</CardHeader>

			<CardContent className="flex flex-col gap-5">
				{/* Avatar placeholder */}
				<div className="flex justify-center py-1">
					<div className="relative">
						<div className="size-20 rounded-full border-2 border-dashed border-border bg-muted flex flex-col items-center justify-center gap-1 cursor-not-allowed select-none">
							<Camera className="size-5 text-muted-foreground" />
							<span className="text-[10px] text-muted-foreground font-medium">
								Photo
							</span>
						</div>
						<div className="absolute -bottom-0.5 -right-0.5 size-6 rounded-full bg-(--accent) flex items-center justify-center shadow ring-2 ring-background cursor-not-allowed">
							<Plus className="size-3.5 text-white" />
						</div>
					</div>
				</div>

				<div className="flex flex-col gap-1.5">
					<Label htmlFor="display-name">Display Name</Label>
					<Input
						id="display-name"
						placeholder="Coming soon…"
						disabled
					/>
				</div>

				<div className="flex flex-col gap-1.5">
					<Label htmlFor="bio">Bio</Label>
					<Input id="bio" placeholder="Coming soon…" disabled />
				</div>

				<div className="flex flex-col gap-1.5">
					<Label htmlFor="location">Location</Label>
					<div className="relative flex items-center">
						<span className="absolute left-2.5 flex items-center pointer-events-none">
							<MapPin className="size-3.5 text-muted-foreground" />
						</span>
						<Input
							id="location"
							placeholder="Coming soon…"
							className="pl-8"
							disabled
						/>
					</div>
				</div>

				<p className="text-xs text-muted-foreground italic bg-muted/60 border border-dashed border-border rounded-lg px-3 py-2.5">
					Profile customization will be fully available in an upcoming
					update.
				</p>
			</CardContent>

			<CardFooter className="justify-between items-center border-t border-border pt-4 mt-2">
				<Button
					variant="ghost"
					size="sm"
					onClick={onBack}
					className="gap-1 text-muted-foreground"
				>
					<ChevronLeft className="size-4" /> Back
				</Button>
				<div className="flex items-center gap-3">
					<span className="text-xs text-muted-foreground">
						Step 2 of 4
					</span>
					<Button
						variant="accent"
						onClick={onNext}
						className="gap-1.5"
					>
						Continue <ChevronRight className="size-4" />
					</Button>
				</div>
			</CardFooter>
		</>
	);
}

// ─── Step 3: Preferences (placeholder) ───────────────────────────────────────

// ─── Step 4: Done ─────────────────────────────────────────────────────────────
const COMPLETED_ITEMS = [
	"Account credentials created",
	"Profile sections prepared",
	"Preferences reviewed",
];

function DoneStep({ onBack }: { onBack: () => void }) {
	return (
		<>
			<CardHeader className="pb-2 text-center">
				<CardTitle className="text-2xl">You're all set! 🎉</CardTitle>
				<CardDescription>
					Your Lieu account is ready to use.
				</CardDescription>
			</CardHeader>

			<CardContent className="flex flex-col items-center gap-6 py-4">
				{/* Success badge with decorative rings */}
				<div className="relative flex items-center justify-center my-2">
					<div className="absolute size-28 rounded-full bg-(--accent)/5 animate-pulse" />
					<div className="absolute size-20 rounded-full bg-(--accent)/10" />
					<div className="size-14 rounded-full bg-(--accent) flex items-center justify-center shadow-lg shadow-(--accent)/30 relative z-10">
						<Check className="size-7 text-white" strokeWidth={3} />
					</div>
					{/* Decorative dots */}
					<div className="absolute -top-3 left-7 size-2.5 rounded-full bg-(--accent)/50" />
					<div className="absolute top-1 right-4 size-1.5 rounded-full bg-orange-400/60" />
					<div className="absolute -bottom-2 left-5 size-2 rounded-full bg-amber-400/50" />
					<div className="absolute -bottom-3 right-6 size-1.5 rounded-full bg-(--accent)/40" />
				</div>

				{/* Checklist */}
				<div className="w-full flex flex-col gap-2">
					{COMPLETED_ITEMS.map((item) => (
						<div
							key={item}
							className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-muted/60"
						>
							<div className="size-5 rounded-full bg-(--accent)/15 flex items-center justify-center shrink-0">
								<Check
									className="size-3 text-(--accent)"
									strokeWidth={3}
								/>
							</div>
							<span className="text-sm">{item}</span>
						</div>
					))}
				</div>

				<p className="text-sm text-center text-muted-foreground max-w-xs">
					More customization options will unlock as you explore Lieu.
				</p>
			</CardContent>

			<CardFooter className="justify-between items-center border-t border-border pt-4 mt-2">
				<Button
					variant="ghost"
					size="sm"
					onClick={onBack}
					className="gap-1 text-muted-foreground"
				>
					<ChevronLeft className="size-4" /> Back
				</Button>
				<Button variant="accent" className="gap-1.5">
					<PartyPopper className="size-4" /> Go to app
				</Button>
			</CardFooter>
		</>
	);
}

// ─── Root component ───────────────────────────────────────────────────────────
function RouteComponent() {
	const { step } = Route.useLoaderData();
	const { setAccount, isLoading: settingPassword, signOut } = useAuth();
	const [currentStep, setCurrentStep] = useState(step);

	const handleAccountNext = async (userName: string, password: string) => {
		await setAccount(userName, password);
		setCurrentStep(2);
	};

	return (
		<div className="relative w-full min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden">
			{/* Background decoration */}
			<div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-(--accent)/8 blur-3xl -translate-y-1/3 translate-x-1/3 pointer-events-none" />
			<div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-(--footer)/8 blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />

			<div className="w-full max-w-md relative z-10">
				<StepIndicator current={step} />

				<Card className="overflow-hidden">
					<Button variant={"default"} onClick={signOut}>
						Signout
					</Button>
					{/* Accent top bar */}
					<div className="h-1 bg-linear-to-r from-(--accent) via-orange-400 to-amber-300" />

					{step === 1 && <AccountStep onNext={handleAccountNext} />}
					{step === 2 && (
						<ProfileStep
							onBack={() => setCurrentStep(1)}
							onNext={() => setCurrentStep(3)}
						/>
					)}

					{step === 3 && (
						<DoneStep onBack={() => setCurrentStep(2)} />
					)}
				</Card>
			</div>
		</div>
	);
}
