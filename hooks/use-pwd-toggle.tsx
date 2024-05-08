import React, { ReactElement, useState } from "react";
import Icon from "@/components/ui/icon-lucide";

// Define a type for the hook return value
export type UsePasswordToggleReturnType = [string, ReactElement];

const usePasswordToggle = (): UsePasswordToggleReturnType => {
	const [visible, setVisibility] = useState<boolean>(false);

	const IconTemplate: ReactElement = (
		<Icon
			name={visible ? "eye-off" : "eye"}
			color='#787878'
			size={20}
			onClick={() => setVisibility((visibility) => !visibility)}
		/>
	);
	const InputType: string = visible ? "text" : "password";

	return [InputType, IconTemplate];
};

export default usePasswordToggle;
