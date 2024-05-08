"use client";
import AddOrgForm from "@/components/settings/add-org-form";
import React, { useEffect } from "react";
import SessionInfo from "./session-info";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const AddOrgPage = () => {
	const router = useRouter();
	const params = useSearchParams();
	const fromLogin = params.get("fromLogin");
	// Trigger refresh if coming from login
	useEffect(() => {
		if (fromLogin === "true") {
			router.push("/settings");
		}
	}, []);
	return (
		<div>
			<SessionInfo />
			<AddOrgForm />
		</div>
	);
};

export default AddOrgPage;
