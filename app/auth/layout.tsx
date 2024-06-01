import { PropsWithChildren } from "react";

const layout = ({ children }: PropsWithChildren) => {
	return (
		<div className='fleex-1 flex h-full w-full py-8   justify-center items-center '>
			{children}
		</div>
	);
};

export default layout;
