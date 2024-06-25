import CreateDeviceForm from "@/components/settings/create-device-by-plant-form";
import React from "react";

interface Props {
	params: {
		plantId: string;
	};
}

const CreateDevicePage = ({ params }: Props) => {
	return <CreateDeviceForm plantId={params.plantId} />;
};

export default CreateDevicePage;
