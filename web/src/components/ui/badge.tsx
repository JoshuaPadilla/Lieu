import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "#/lib/utils";

const badgeVariants = cva(
	"inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide",
	{
		variants: {
			variant: {
				default:
					"border-transparent bg-[var(--ink)] text-[var(--surface)]",
				secondary:
					"border-[var(--line-strong)] bg-[var(--muted)] text-[var(--ink)]",
				outline:
					"border-[var(--line-strong)] bg-transparent text-[var(--ink-soft)]",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

function Badge({
	className,
	variant,
	...props
}: React.ComponentProps<"div"> & VariantProps<typeof badgeVariants>) {
	return (
		<div
			data-slot="badge"
			className={cn(badgeVariants({ variant }), className)}
			{...props}
		/>
	);
}

export { Badge, badgeVariants };
