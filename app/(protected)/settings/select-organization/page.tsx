import SelectOrgMenu from "@/components/settings/select-org";
import { Card } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import React from "react";

const SelectOrgPage = () => {
	return (
		<div className='m-auto flex flex-col justify-center items-center  w-3/4'>
			<SelectOrgMenu />
		</div>
	);
};

export default SelectOrgPage;
