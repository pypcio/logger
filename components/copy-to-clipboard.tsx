"use client";
import { Icon } from "@iconify/react";
import { useToast } from "@/components/ui/use-toast";
interface Props {
	text: string;
}
const CopyToClipboardIcon = ({ text }: Props) => {
	const { toast } = useToast();
	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(text);
			toast({
				color: "",
				variant: "default",
				title: "Copied to clipboard!",
			}); // Consider replacing this with a more subtle UI indication
		} catch (err) {
			toast({
				variant: "destructive",
				title: "Could not copy to clipboard",
			});
		}
	};

	return (
		<button onClick={handleCopy} aria-label='Copy to clipboard' className='p-1'>
			<Icon icon='lucide:copy' width='12' height='12' />
		</button>
	);
};

export default CopyToClipboardIcon;
