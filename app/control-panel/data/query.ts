import { getAllPlantActionControl } from "@/lib/services/api";
import { useQuery } from "@tanstack/react-query";
export const useAllPlantsActionControl = () =>
	useQuery({
		queryKey: ["allPlantsWithActions"],
		queryFn: getAllPlantActionControl,
	});
