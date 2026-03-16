import { Moon, Sun } from "lucide-react";
import { useLayoutEffect, useState } from "react";

import { Button } from "#/components/ui/button";

type ThemeMode = "light" | "dark";

function getInitialMode(): ThemeMode {
	return "light";
}

function applyThemeMode(mode: ThemeMode) {
	const resolved = mode;

	document.documentElement.classList.remove("light", "dark");
	document.documentElement.classList.add(resolved);

	document.documentElement.setAttribute("data-theme", mode);

	document.documentElement.style.colorScheme = resolved;
}

export default function ThemeToggle() {
	const [mode, setMode] = useState<ThemeMode>(() => getInitialMode());

	useLayoutEffect(() => {
		applyThemeMode(mode);
	}, [mode]);

	function toggleMode() {
		const nextMode: ThemeMode = mode === "light" ? "dark" : "light";
		setMode(nextMode);
	}

	const label = `Theme mode: ${mode}. Click to switch mode.`;
	const Icon = mode === "light" ? Sun : Moon;

	return (
		<Button
			type="button"
			variant="outline"
			size="sm"
			onClick={toggleMode}
			aria-label={label}
			title={label}
			className="gap-1.5 rounded-full px-3"
		>
			<Icon className="h-3.5 w-3.5" />
			<span>{mode === "dark" ? "Dark" : "Light"}</span>
		</Button>
	);
}
