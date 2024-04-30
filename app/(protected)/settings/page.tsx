import AddOrgForm from "@/components/settings/add-org";
import { useSession } from "next-auth/react";
import React from "react";
import SessionInfo from "./session-info";

const AddOrgPage = () => {
	return (
		<div>
			<SessionInfo />
			<AddOrgForm />
		</div>
	);
};

export default AddOrgPage;
