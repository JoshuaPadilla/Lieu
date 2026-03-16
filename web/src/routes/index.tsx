import { createFileRoute } from "@tanstack/react-router";
import { Diamond, Star } from "lucide-react";

import { LandingMap } from "#/components/LandingMap";

import { Button } from "#/components/ui/button";
import { Card, CardContent } from "#/components/ui/card";

export const Route = createFileRoute("/")({ component: App });

const press = [
	"LonelyPlanet",
	"Conde Nast",
	"National Geographic",
	"Travel+Leisure",
	"Vogue Travel",
];

const spotlights = [
	{
		label: "Cafe • Makati",
		title: "Bean & Barley Hidden Roastery",
		tone: "from-[#b9cfb8] via-[#dce7d7] to-[#94b39a]",
	},
	{
		label: "Nature • Baguio",
		title: "The Foggy Ridge Viewpoint",
		tone: "from-[#d47a5f] via-[#e8b267] to-[#be5f58]",
	},
	{
		label: "Dining • Vigan",
		title: "Abuelita's Secret Kitchen",
		tone: "from-[#e6a06f] via-[#f3bf83] to-[#c17065]",
	},
];

function App() {
	return (
		<main className="min-h-screen bg-(--bg)">
			<section>
				<div className="hero-shell min-h-[calc(100vh-4.5rem)] border border-(--line) border-x-0 border-t-0 bg-(--surface) px-6 pb-7 pt-7 sm:px-10 sm:pb-8 lg:px-14 lg:pt-8">
					<div className="grid gap-8 lg:grid-cols-[1fr_1.08fr] lg:items-center">
						<div>
							<p className="mb-5 text-[12px] font-extrabold uppercase tracking-[0.24em] text-(--accent)">
								Curated by locals, not algorithms.
							</p>
							<h1 className="landing-display max-w-[11ch] text-[3.25rem] leading-[0.9] tracking-[-0.03em] text-(--ink) sm:text-[4.15rem] lg:text-[5.2rem] font-bold">
								Discover the spots only locals know about
							</h1>
							<p className="mt-6 max-w-[30rem] text-lg leading-8 text-(--ink-soft)">
								Skip the tourist traps. Access a private
								collection of secret cafes, hidden viewpoints,
								and neighborhood favorites.
							</p>

							<div className="mt-7 flex flex-wrap items-center gap-3">
								<Button
									variant="default"
									className="h-12 rounded-xl px-7 text-base font-semibold"
								>
									Explore the map
								</Button>
								<Button
									variant="outline"
									className="h-12 rounded-xl px-7 text-base font-semibold"
								>
									Submit a gem
								</Button>
							</div>

							<div className="mt-7 flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.14em] text-(--ink-soft)">
								<Star className="h-3.5 w-3.5 fill-(--accent) text-(--accent)" />
								<Diamond className="h-2.5 w-2.5 fill-current text-(--ink-soft)" />
								<span>1,240 gems revealed in 42 cities</span>
							</div>
						</div>

						<Card className="overflow-visible rounded-none border-0 bg-transparent shadow-none">
							<CardContent className="p-0">
								<LandingMap />
							</CardContent>
						</Card>
					</div>

					<div className="mt-9 grid grid-cols-2 gap-y-3 border-t border-(--line) pt-7 text-center text-[1.2rem] font-semibold text-(--ink-soft) sm:grid-cols-5">
						{press.map((name) => (
							<p key={name} className="m-0">
								{name}
							</p>
						))}
					</div>
				</div>
			</section>

			<section className="px-6 py-14 sm:px-10 lg:px-14">
				<h2 className="landing-display text-5xl font-bold tracking-tight text-(--ink)">
					Local Spotlights
				</h2>
				<p className="mt-2 text-sm text-(--ink-soft)">
					Hand-picked treasures from our community members this week.
				</p>

				<div className="mt-8 grid gap-4 md:grid-cols-3">
					{spotlights.map((item) => (
						<Card
							key={item.title}
							className="group overflow-hidden rounded-xl border-(--line) bg-(--surface) shadow-none"
						>
							<CardContent className="p-0">
								<div
									className={`h-60 bg-linear-to-br ${item.tone}`}
								/>
								<div className="space-y-1 p-3">
									<p className="text-[10px] font-bold uppercase tracking-[0.14em] text-(--accent)">
										{item.label}
									</p>
									<h3 className="text-base font-semibold text-(--ink)">
										{item.title}
									</h3>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</section>
		</main>
	);
}
