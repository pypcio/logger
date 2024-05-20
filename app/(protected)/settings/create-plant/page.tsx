"use client";
import CreatePlantForm from "@/components/settings/create-plant-form";
import { usePlantActionControl } from "@/lib/services/queries";
import { useParams } from "next/navigation";
import React from "react";

const CreatePlantPage = () => {
	const { plantId } = useParams<{ plantId: string }>();
	const { data: actions, isLoading, error } = usePlantActionControl(plantId);
	console.log("actions: ", actions);
	return <CreatePlantForm />;
};

export default CreatePlantPage;
