import { CircleCheck } from "lucide-react";
import React from "react";

interface FormErrorProps {
	message?: string;
}

const FormSuccess = ({ message }: FormErrorProps) => {
	if (!message) return null;
	return (
		<div className='bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500 '>
			<CircleCheck className='h-4 w-4' /> {message}
		</div>
	);
};

export default FormSuccess;
