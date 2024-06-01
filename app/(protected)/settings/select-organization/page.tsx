import SelectOrgMenu from "@/components/settings/select-org";
import { Card } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import React from "react";

const SelectOrgPage = () => {
	return <SelectOrgMenu />;
};

export default SelectOrgPage;
