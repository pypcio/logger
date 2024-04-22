import { PropsWithChildren } from "react";

const layout = ({ children }: PropsWithChildren) => {
	return (
		<div className='h-screen flex items-center justify-center bg-sky-200'>
			{children}
		</div>
	);
};

export default layout;
