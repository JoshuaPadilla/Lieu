export default function Footer() {
	const cities = [
		"Davao",
		"Iloilo",
		"Baguio",
		"Vigan",
		"Bacoor",
		"Zamboanga",
		"Dumaguete",
	];

	return (
		<footer className="mt-16 border-t border-(--line) bg-(--footer) px-4 py-4">
			<div className="page-wrap">
				<ul className="m-0 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 p-0 text-[10px] font-semibold uppercase tracking-[0.16em] text-(--footer-ink) opacity-90">
					{cities.map((city) => (
						<li
							key={city}
							className="flex list-none items-center gap-4"
						>
							<span>{city}</span>
							<span
								aria-hidden="true"
								className="inline-block h-1 w-1 rounded-full bg-(--footer-ink)/40"
							/>
						</li>
					))}
				</ul>
			</div>
		</footer>
	);
}
