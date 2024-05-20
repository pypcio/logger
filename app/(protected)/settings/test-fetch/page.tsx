"use client";
import { usePlantActionControl } from "@/lib/services/queries";

const ExampleComponent = () => {
	const plantId = "clvqxqvq2000213jwajvgff5v"; // example plant ID
	const { data, isLoading, error } = usePlantActionControl(plantId);

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.message}</div>;

	return (
		<div>
			{data?.map((actionControl) => (
				<div key={actionControl.id}>
					<h2>{actionControl.action.name}</h2>
					<p>Unit: {actionControl.action.unit}</p>
					<p>Status: {actionControl.status}</p>
					<p>Value: {actionControl.value}</p>
					<p>Schedule: {new Date(actionControl.schedule).toLocaleString()}</p>
				</div>
			))}
		</div>
	);
};
export default ExampleComponent;
