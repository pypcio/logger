import { useQuery } from "@tanstack/react-query";
import {
	getPlantActionControl,
	getPlantWithDevicesById,
	getUserByAuth,
	// getUserMembershipInfo,
	getUserMembershipsInfo,
} from "./api";

// export const useUserMembershipInfo = () =>
// 	useQuery({
// 		queryKey: ["memberShipInfo"],
// 		queryFn: getUserMembershipInfo,
// 	});

export const useUserMembershipsInfo = () =>
	useQuery({
		queryKey: ["memberShipsInfo"],
		queryFn: getUserMembershipsInfo,
	});

export const usePlantWithDevices = (plantId: string) =>
	useQuery({
		queryKey: ["plantWithDevices", plantId],
		queryFn: () => getPlantWithDevicesById(plantId),
		enabled: !!plantId,
	});

export const usePlantActionControl = ({ plantId }: { plantId: string }) => {
	console.log("planId: ", plantId);
	return useQuery({
		queryKey: ["plantWithActions", plantId],
		queryFn: () => getPlantActionControl(plantId),
		enabled: !!plantId,
	});
};

export const useUserByAuth = () =>
	useQuery({
		queryKey: ["user"],
		queryFn: getUserByAuth,
		refetchOnMount: true,
	});
