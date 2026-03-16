import { LocateFixed, Utensils } from "lucide-react";
import { useState } from "react";

import { Map, MapMarker, MarkerContent, useMap } from "#/components/ui/map";

// Metro Manila center
const CENTER: [number, number] = [121.01, 14.622];
const ZOOM = 11.2;

type PinType = "red" | "dark" | "food";

const pins: {
	lng: number;
	lat: number;
	type: PinType;
	label: string | null;
}[] = [
	// Hidden Alley Cafe — Malabon/Caloocan area (upper-left)
	{ lng: 120.958, lat: 14.667, type: "red", label: "Hidden Alley Cafe" },
	// Dark round pin — near QC/Fairview (upper-right, no label)
	{ lng: 121.083, lat: 14.689, type: "dark", label: null },
	// Nona's Kitchen — Quezon City/Cubao area (right side)
	{ lng: 121.05, lat: 14.62, type: "food", label: "Nona's Kitchen" },
	// Second food pin — no label
	{ lng: 121.044, lat: 14.608, type: "food", label: null },
	// The Jazz Basement — port/Manila area (center)
	{ lng: 120.984, lat: 14.573, type: "dark", label: "The Jazz Basement" },
	// Sunset Ridge — Mandaluyong/Makati (bottom)
	{ lng: 121.018, lat: 14.537, type: "dark", label: "Sunset Ridge" },
];

function RedPin() {
	return (
		<svg
			width="22"
			height="28"
			viewBox="0 0 22 28"
			className="drop-shadow-md"
			aria-hidden="true"
		>
			<path
				d="M11 0C4.92 0 0 4.92 0 11c0 8.25 11 17 11 17s11-8.75 11-17C22 4.92 17.08 0 11 0z"
				fill="var(--accent)"
			/>
			<circle cx="11" cy="10.5" r="4" fill="white" opacity="0.3" />
		</svg>
	);
}

function DarkPin() {
	return (
		<svg
			width="20"
			height="26"
			viewBox="0 0 20 26"
			className="drop-shadow-md"
			aria-hidden="true"
		>
			<path
				d="M10 0C4.48 0 0 4.48 0 10c0 7.5 10 16 10 16s10-8.5 10-16C20 4.48 15.52 0 10 0z"
				fill="var(--ink)"
			/>
			<circle cx="10" cy="9.5" r="3.5" fill="white" opacity="0.18" />
		</svg>
	);
}

function FoodPin() {
	return (
		<div className="flex h-7 w-7 items-center justify-center rounded-full bg-(--ink) shadow-lg ring-2 ring-white/20 ring-offset-0">
			<Utensils className="h-3.5 w-3.5 text-white opacity-90" />
		</div>
	);
}

function PinLabel({ children }: { children: string }) {
	return (
		<div className="rounded-lg border border-(--line-strong) bg-(--surface)/95 px-2 py-1 text-[11px] font-semibold text-(--ink) shadow-sm backdrop-blur-sm whitespace-nowrap">
			{children}
		</div>
	);
}

type UserLocation = {
	lng: number;
	lat: number;
};

function LocationAction({
	onLocate,
}: {
	onLocate: (coords: UserLocation) => void;
}) {
	const { map } = useMap();
	const [loading, setLoading] = useState(false);

	function requestLocation() {
		if (!navigator.geolocation || !map || loading) return;

		setLoading(true);
		navigator.geolocation.getCurrentPosition(
			(position) => {
				const coords = {
					lng: position.coords.longitude,
					lat: position.coords.latitude,
				};

				onLocate(coords);
				map.flyTo({
					center: [coords.lng, coords.lat],
					zoom: 13.5,
					duration: 1400,
				});
				setLoading(false);
			},
			() => {
				setLoading(false);
			},
			{ enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
		);
	}

	return (
		<div className="absolute bottom-3 left-3 z-20">
			<button
				type="button"
				onClick={requestLocation}
				className="inline-flex items-center gap-1.5 rounded-lg border border-(--line-strong) bg-(--surface)/95 px-3 py-2 text-xs font-semibold text-(--ink) shadow-sm backdrop-blur-sm"
			>
				<LocateFixed className="h-3.5 w-3.5" />
				{loading ? "Locating..." : "Use my location"}
			</button>
		</div>
	);
}

function UserPin() {
	return (
		<div className="relative h-4 w-4 rounded-full border-2 border-white bg-(--ink) shadow-lg">
			<span className="absolute inset-[-7px] rounded-full bg-(--ink)/20" />
		</div>
	);
}

export function LandingMap() {
	const [userLocation, setUserLocation] = useState<UserLocation | null>(null);

	return (
		<div className="relative aspect-4/3">
			<div className="pointer-events-none absolute inset-x-3 bottom-0 top-6 rounded-[24px] bg-(--ink)/8 blur-2xl" />
			<div className="absolute inset-0 overflow-hidden rounded-2xl border border-(--line-strong) bg-(--map-bg) shadow-[0_20px_34px_rgba(41,53,70,0.14)] transition-transform duration-300 lg:origin-bottom-right lg:rotate-[-0.55deg] lg:hover:rotate-0">
				<Map
					center={CENTER}
					zoom={ZOOM}
					pitch={8}
					bearing={-6}
					scrollZoom={false}
					dragRotate={false}
					pitchWithRotate={false}
					className="absolute inset-0"
				>
					{pins.map((pin) => {
						const hasLabel = pin.label !== null;
						return (
							<MapMarker
								key={`${pin.lng}-${pin.lat}`}
								longitude={pin.lng}
								latitude={pin.lat}
								anchor="center"
							>
								<MarkerContent
									className={
										hasLabel
											? "relative flex flex-col items-center gap-1"
											: undefined
									}
								>
									{pin.type === "red" && <RedPin />}
									{pin.type === "dark" && <DarkPin />}
									{pin.type === "food" && <FoodPin />}
									{hasLabel && (
										<PinLabel>
											{pin.label as string}
										</PinLabel>
									)}
								</MarkerContent>
							</MapMarker>
						);
					})}

					{userLocation && (
						<MapMarker
							longitude={userLocation.lng}
							latitude={userLocation.lat}
							anchor="center"
						>
							<MarkerContent className="relative flex flex-col items-center gap-1">
								<UserPin />
								<PinLabel>You are here</PinLabel>
							</MarkerContent>
						</MapMarker>
					)}

					<LocationAction onLocate={setUserLocation} />
				</Map>
			</div>
		</div>
	);
}
