import { useQuery } from "@tanstack/react-query";
import {
	getPlantWithDevicesById,
	getUserByAuth,
	getUserMembershipsInfo,
} from "./api";

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

export const useUserByAuth = () =>
	useQuery({
		queryKey: ["user"],
		queryFn: getUserByAuth,
	});
