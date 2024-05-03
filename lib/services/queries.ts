import { useQuery } from "@tanstack/react-query";
import { getUserMembershipsInfo } from "./api";

export const useUserMembershipsInfo = () =>
	useQuery({
		queryKey: ["memberShipsInfo"],
		queryFn: getUserMembershipsInfo,
	});
