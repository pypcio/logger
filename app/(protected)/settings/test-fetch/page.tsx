"use client";

import { useOrganizationEntitiesActions } from "@/app/demo/query";

const ExampleComponent = () => {
	const { data, isLoading, error } = useOrganizationEntitiesActions(
		"clvqua8rf0000e27bdi39x2ov"
	);
	console.log("data: ", data);
	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.message}</div>;
	return (
		<div>
			{/* {data?.map((actionControl) => (
				<div key={actionControl.id}>
					<h2>{actionControl.action.name}</h2>
					<p>Unit: {actionControl.action.unit}</p>
					<p>Status: {actionControl.status}</p>
					<p>Value: {actionControl.value}</p>
					<p>Schedule: {new Date(actionControl.schedule).toLocaleString()}</p>
				</div>
			))} */}
		</div>
	);
};
export default ExampleComponent;
