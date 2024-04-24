import { PropsWithChildren } from "react";

const layout = ({ children }: PropsWithChildren) => {
	return (
		<div className='fleex-1 flex h-full w-full   justify-center items-center  bg-sky-200'>
			{children}
		</div>
	);
};

export default layout;
