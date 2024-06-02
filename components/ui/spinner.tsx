import { cn } from "@/lib/utils";

function LoadingSpinner({ className }: React.HTMLAttributes<HTMLOrSVGElement>) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
			className={cn("animate-spin text-slate-300", className)}>
			<path d='M21 12a9 9 0 1 1-6.219-8.56' />
		</svg>
	);
}

export { LoadingSpinner };
