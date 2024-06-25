"use client";
import CreateDeviceOrgForm from "@/components/settings/create-device-by-org-form";
import { usePlants } from "@/lib/services/queries";
import ActionFormSkeleton from "@/components/data-table/action/action-form-skeleton";

const CreateDeviceWithOrgPage = () => {
	const { data: plants, isLoading } = usePlants();
	if (isLoading) {
		return <ActionFormSkeleton />;
	}
	if (plants) {
		return (
			<div className='mt-4 flex items-center justify-center'>
				<CreateDeviceOrgForm plants={plants} />
			</div>
		);
	}
};

export default CreateDeviceWithOrgPage;
